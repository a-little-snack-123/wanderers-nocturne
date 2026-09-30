async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const check=(ok,message)=>{if(!ok)throw new Error(message);};
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({colorScheme:'dark'});
 await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0||i.id==='viewer-image'));
 await page.screenshot({path:'output/playwright/desktop-hero.png'});
 for(const id of ['v4','v6','v8','v11']){await page.locator(`[data-character="${id}"]`).click();check(await page.locator(`[data-character="${id}"]`).getAttribute('aria-selected')==='true','Character tab '+id);}
 await page.locator('[data-character="v8"]').click();
 await page.locator('#character').screenshot({path:'output/playwright/character.png'});
 for(let i=0;i<6;i++){await page.locator(`[data-scene="${i}"]`).click();check((await page.locator('#scene-current').getAttribute('src')).endsWith(`scene-${i+1}.webp`),'Scene '+i);}
 await page.locator('[data-scene="3"]').click();
 await page.locator('[data-filter="character"]').click();check(await page.locator('#reference-grid figure:visible').count()===4,'Character filter');
 await page.locator('[data-filter="scene"]').click();check(await page.locator('#reference-grid figure:visible').count()===6,'Scene filter');
 await page.locator('[data-filter="all"]').click();check(await page.locator('#reference-grid figure:visible').count()===10,'All filter');
 await page.locator('#reference-grid button').first().click();check(await page.locator('#image-dialog').evaluate(d=>d.open),'Image dialog');
 await page.locator('#zoom-image').click();check(await page.locator('.viewer-content').evaluate(e=>e.classList.contains('zoomed')),'Original size');
 await page.keyboard.press('Escape');check(!await page.locator('#image-dialog').evaluate(d=>d.open),'Escape close');
 check(await page.locator('#reference-grid button').first().evaluate(b=>b===document.activeElement),'Focus restore');
 await page.locator('[data-character="v4"]').click();await page.keyboard.press('ArrowRight');check(await page.locator('[data-character="v6"]').getAttribute('aria-selected')==='true','Keyboard tabs');
 await page.evaluate(()=>scrollTo(0,0));await page.locator('#theme-toggle').click();check(await page.locator('html').getAttribute('data-theme')==='light','Light theme');
 await page.screenshot({path:'output/playwright/desktop-light.png'});
 await page.locator('#theme-toggle').click();
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.evaluate(()=>scrollTo(0,0));check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow at '+width);await page.screenshot({path:`output/playwright/mobile-${width}.png`});}
 await page.setViewportSize({width:390,height:844});await page.locator('#references').screenshot({path:'output/playwright/mobile-gallery.png'});
 await page.setViewportSize({width:1440,height:1000});await page.locator('[data-character="v8"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'output/playwright/desktop-complete.png',fullPage:true});
 check(!errors.length,'Browser errors '+errors.join(';'));
 return {passed:true,images:await page.locator('img[src]').count(),characterTabs:4,sceneTabs:6,filters:3,themes:2,mobileWidths:[390,320],errors};
}
