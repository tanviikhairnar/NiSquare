import { preview } from 'vite';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const VIEWPORTS = [
  { name: 'mobile-small', width: 360, height: 740, isMobile: true, deviceScaleFactor: 2 },
  { name: 'mobile-iphone', width: 390, height: 844, isMobile: true, deviceScaleFactor: 3 },
  { name: 'tablet-portrait', width: 768, height: 1024, isMobile: false, deviceScaleFactor: 2 },
  { name: 'tablet-landscape', width: 1024, height: 768, isMobile: false, deviceScaleFactor: 2 },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
  { name: 'ultrawide', width: 1920, height: 1080, isMobile: false, deviceScaleFactor: 1 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/pages/services' },
  { name: 'collection-wedding', path: '/collections/wedding-packaging' },
  { name: 'contact', path: '/pages/contact' },
  { name: 'our-story', path: '/pages/our-story' },
];

async function runResponsiveAudit() {
  const outputDir = path.resolve('scratch/responsive-test');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting Vite preview server on port 4180...');
  const previewServer = await preview({
    preview: {
      port: 4180,
      host: '127.0.0.1',
    },
  });

  console.log('Launching Chrome for responsive test...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080']
  });

  const auditReport = [];

  try {
    const page = await browser.newPage();

    for (const vp of VIEWPORTS) {
      console.log(`\n======================================================`);
      console.log(`TESTING VIEWPORT: ${vp.name.toUpperCase()} (${vp.width}x${vp.height})`);
      console.log(`======================================================`);

      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        deviceScaleFactor: vp.deviceScaleFactor || 1,
      });

      for (const route of ROUTES) {
        const url = `http://127.0.0.1:4180${route.path}`;
        process.stdout.write(`  Testing ${route.name} (${route.path})... `);

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await new Promise(r => setTimeout(r, 600));

        // Evaluate layout metrics
        const metrics = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;

          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const innerWidth = window.innerWidth;
          const hasHorizontalOverflow = scrollWidth > innerWidth + 1.5;

          // Find overflowing elements if any
          const overflowingElements = [];
          if (hasHorizontalOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > innerWidth + 1.5) {
                const tag = el.tagName.toLowerCase();
                const cls = typeof el.className === 'string' ? el.className.trim() : '';
                const id = el.id ? `#${el.id}` : '';
                overflowingElements.push({
                  selector: `${tag}${id}${cls ? '.' + cls.split(' ').slice(0, 2).join('.') : ''}`,
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  overflowBy: Math.round(rect.right - innerWidth)
                });
                if (overflowingElements.length >= 5) break;
              }
            }
          }

          // Header & Nav visibility
          const hamburger = document.querySelector('.hamburger-btn');
          const desktopNav = document.querySelector('.header-primary-nav');
          const logo = document.querySelector('.header-logo-image');

          const isHamburgerVisible = hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false;
          const isDesktopNavVisible = desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false;

          // Check Hero elements if on home
          let heroStats = null;
          const heroSection = document.querySelector('.hero-section');
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButton = document.querySelector('.hero-button');
            heroStats = {
              height: Math.round(heroRect.height),
              titleFontSize: heroTitle ? window.getComputedStyle(heroTitle).fontSize : null,
              subtitleFontSize: heroSubtitle ? window.getComputedStyle(heroSubtitle).fontSize : null,
              buttonWidth: heroButton ? Math.round(heroButton.getBoundingClientRect().width) : null,
              buttonHeight: heroButton ? Math.round(heroButton.getBoundingClientRect().height) : null,
            };
          }

          // Check Category Cards Grid if present
          let categoryStats = null;
          const catGrid = document.querySelector('.home-category-grid');
          if (catGrid) {
            const cards = Array.from(catGrid.querySelectorAll('.home-category-card'));
            const computedStyle = window.getComputedStyle(catGrid);
            const cols = computedStyle.gridTemplateColumns ? computedStyle.gridTemplateColumns.split(' ').length : 0;
            categoryStats = {
              cardsCount: cards.length,
              gridColumns: cols,
              firstCardWidth: cards[0] ? Math.round(cards[0].getBoundingClientRect().width) : 0,
              firstCardHeight: cards[0] ? Math.round(cards[0].getBoundingClientRect().height) : 0,
            };
          }

          return {
            scrollWidth,
            innerWidth,
            hasHorizontalOverflow,
            overflowingElements,
            isHamburgerVisible,
            isDesktopNavVisible,
            logoHeight: logo ? Math.round(logo.getBoundingClientRect().height) : null,
            heroStats,
            categoryStats,
          };
        });

        // Save screenshot
        const screenshotName = `${vp.name}_${route.name}.png`;
        const screenshotPath = path.join(outputDir, screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        const status = metrics.hasHorizontalOverflow ? 'FAIL (Overflow)' : 'PASS';
        console.log(`${status} [scrollW: ${metrics.scrollWidth}px vs vp: ${metrics.innerWidth}px]`);

        if (metrics.hasHorizontalOverflow) {
          console.warn(`    ⚠️ Overflowing elements:`, JSON.stringify(metrics.overflowingElements));
        }

        auditReport.push({
          viewport: vp.name,
          width: vp.width,
          height: vp.height,
          route: route.name,
          hasHorizontalOverflow: metrics.hasHorizontalOverflow,
          scrollWidth: metrics.scrollWidth,
          innerWidth: metrics.innerWidth,
          overflowingElements: metrics.overflowingElements,
          navState: {
            hamburger: metrics.isHamburgerVisible,
            desktopNav: metrics.isDesktopNavVisible
          },
          hero: metrics.heroStats,
          categoryGrid: metrics.categoryStats,
          screenshot: screenshotName,
        });
      }

      // Test mobile drawer interaction if on mobile
      if (vp.width < 1000) {
        process.stdout.write(`  Testing mobile navigation drawer toggle... `);
        await page.goto(`http://127.0.0.1:4180/`, { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 400));
        const hamburgerBtn = await page.$('.hamburger-btn');
        if (hamburgerBtn) {
          await hamburgerBtn.click();
          await new Promise(r => setTimeout(r, 400));
          const drawerOpen = await page.evaluate(() => {
            const drawer = document.querySelector('.drawer-panel');
            const backdrop = document.querySelector('.drawer-backdrop');
            return {
              drawerHasOpenClass: drawer ? drawer.classList.contains('open') : false,
              backdropHasOpenClass: backdrop ? backdrop.classList.contains('open') : false,
              drawerRect: drawer ? {
                width: Math.round(drawer.getBoundingClientRect().width),
                left: Math.round(drawer.getBoundingClientRect().left),
              } : null
            };
          });
          const drawerShot = path.join(outputDir, `${vp.name}_drawer_open.png`);
          await page.screenshot({ path: drawerShot });
          console.log(`PASS (Drawer open: ${drawerOpen.drawerHasOpenClass}, width: ${drawerOpen.drawerRect?.width}px)`);
        }
      }
    }

    const reportPath = path.join(outputDir, 'responsive-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
    console.log(`\n======================================================`);
    console.log(`ALL RESPONSIVE TESTS FINISHED SUCCESSFULLY!`);
    console.log(`Report: ${reportPath}`);
    console.log(`======================================================`);

  } finally {
    await browser.close();
    await previewServer.close();
  }
}

runResponsiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
