import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/pages/contact', { waitUntil: 'networkidle0' });

const details = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Nikita'));
  const btn = btns[0];
  const a = document.querySelector('a[href*="instagram"]');
  
  function getMatchedRules(el) {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            rules.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }
    return rules;
  }

  return {
    btnFound: !!btn,
    btnClass: btn?.className,
    aFound: !!a,
    aClass: a?.className,
    btnRules: btn ? getMatchedRules(btn).map(r => r.cssText) : [],
    aRules: a ? getMatchedRules(a).map(r => r.cssText) : [],
    btnStyleProps: btn ? {
      color: window.getComputedStyle(btn).color,
      bg: window.getComputedStyle(btn).backgroundColor,
      border: window.getComputedStyle(btn).border
    } : null,
    aStyleProps: a ? {
      color: window.getComputedStyle(a).color,
      bg: window.getComputedStyle(a).backgroundColor,
      border: window.getComputedStyle(a).border
    } : null
  };
});

console.log(JSON.stringify(details, null, 2));
await browser.close();

