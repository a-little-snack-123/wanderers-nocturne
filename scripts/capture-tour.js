async (page) => {
 const states=[];
 const snap=async(label)=>states.push({label,...await page.evaluate(()=>{const s=window.__SKYBRIDGE__.snapshot();return {position:s.position,place:s.place,seated:s.seated,architectureAsset:s.architectureAsset,characterAsset:s.characterAsset};})});
 const walk=async(ms)=>{await page.keyboard.down('w');await page.waitForTimeout(ms);await page.keyboard.up('w');};
 await page.locator('canvas').click({position:{x:700,y:450}});
 await page.keyboard.press('1');await page.keyboard.press('h');await page.waitForTimeout(1000);
 await snap('bridge start');await walk(6000);await page.waitForTimeout(1000);await snap('bridge end');
 await page.keyboard.press('2');await page.waitForTimeout(1000);await walk(3000);await page.waitForTimeout(1500);await snap('hall');
 await page.keyboard.press('3');await page.waitForTimeout(1000);await walk(1300);await page.waitForTimeout(1500);await snap('stair');
 await page.keyboard.press('4');await page.waitForTimeout(1200);
 await page.mouse.move(720,420);await page.mouse.down();await page.mouse.move(790,420,{steps:36});await page.mouse.up();await page.waitForTimeout(2000);await snap('window');
 await page.keyboard.press('5');await page.waitForTimeout(1000);await walk(3500);await page.waitForTimeout(1000);await snap('corridor');
 await page.keyboard.press('6');await page.waitForTimeout(1000);await page.keyboard.press('f');await page.waitForTimeout(5000);await snap('reading');
 await page.keyboard.press('f');await page.waitForTimeout(1000);
 return states;
}
