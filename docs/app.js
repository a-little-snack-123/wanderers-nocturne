const $ = (id) => document.getElementById(id);
const characters = {
 v4: ['character-v4','v4 / Blender 四视图渲染','先找到轮廓，还没有找到质感。','蓝色外套、浅色头发、挎包和提灯，建立了角色的基本识别。但发片像整块壳面，袖口与手部的衔接也需要继续检查。','下一步：检查侧面厚度、发束层次，以及提灯的承重关系。'],
 v6: ['character-v6','v6 / Blender 四视图渲染','修正发束与连接，继续观察体积。','这一轮调整了头发贴合、肩袖和握灯结构。整体识别更清楚，但头发的机械分片、服装体积与手部自然度仍未达到参考目标。','下一步：用多角度检查代替只看正面，继续拆解头部与衣料。'],
 v8: ['character-v8','v8 / 实际 GLB 模型检视页','让侧脸与服装，经得起转身。','对头骨、面颊和头发的前后厚度进行修正，细化外套、内裙、领巾、袖口与短靴。保留四视图，逐一检查轮廓是否一致。','仍在返工：侧后发片的壳面感、衣褶与皮革细节。'],
 v11: ['reading-current','v11 / 网页坐读实机截图','从独立模型，走进真实的空间。','人物需要与桌、椅、书和灯一起成立。针对桌面阅读调整坐姿和椅背，检查手与书、身体与椅子的接触关系。','当前状态：交互已接入；动作自然度、布料和接触细节尚未终审。']
};
const scenes = [
 ['云端长桥','reference-overview','长桥把视线引向塔楼，暖灯沿路径递进；小旅人走在连续的云海之上。','调整圆顶、建筑退台与铺砖，建立主塔和远城的层次。','云团仍有独立块状感；远景雾化、石材细节与灯光层级还不够自然。'],
 ['塔内大厅','reference-hall','进入学院时感受到挑空与纵深；左侧旋梯形成大曲线，灯串与通廊引向远处。','调整大厅观景点、上层结构与楼梯支承，重新组织主轴和可见空间。','挑空感、上下层关系与冷暖光区仍需打磨，不能仅靠增加道具。'],
 ['旋转阶梯','reference-overview','把旋梯看作一条连续上升的曲线，而不只是一组独立踏步。','补充连续支承石带，检查平台连接和人物通行净空。','扶手与平台衔接、窄处镜头、人物和提灯的运动关系仍需继续检查。'],
 ['窗边远眺','reference-window','窗框成为画框：近处桌灯，中间人物，窗外近塔，后方远城、云海和月亮。','扩宽窗景、调整近塔和远景位置，修正欠曝与过强补光。','框景已改善；材质、远景空气感和室内外的光照层次仍有差距。'],
 ['灯火回廊','reference-corridor','拱门与暖灯逐渐缩小，形成节奏；尽头有一个值得走近的目的地。','调整铺砖与视线关系，检查重复模块、局部装饰和远端焦点。','灯光递进和装饰疏密还不够自然，部分结构仍有机械重复感。'],
 ['阅读角落','reference-reading','书与暖灯成为焦点；桌面有留白，角色和家具共同组成一个安静的停留点。','增加针对桌面书本的坐姿，调整椅子位置与靠背高度。','手与书、背与椅子、脚与地面的关系需要逐角度验收；自然度仍在打磨。']
];
const refs = [
 ['reference-character','人物整体方向','character','角色轮廓、蓝色服装与提灯'],
 ['reference-head','头部建模拆解','character','正侧背视角与头发分层'],
 ['reference-grip','提灯握持','character','手指、提环与承重关系'],
 ['reference-animation','动作设计','character','行走、阅读与姿态参考'],
 ['reference-overview','建筑模块总览','scene','圆顶、拱窗、栏杆与道具'],
 ['reference-clouds','云海层次','scene','连续云层与前中远景'],
 ['reference-hall','塔内大厅','scene','挑空、主轴与楼梯曲线'],
 ['reference-window','窗边远眺','scene','框景、近塔与远城'],
 ['reference-corridor','灯火回廊','scene','重复拱门与光照节奏'],
 ['reference-reading','阅读角落','scene','书桌、灯与人物的尺度']
];
function setImage(img, opener, name, caption, alt) {
 img.src=`assets/${name}.webp`;img.alt=alt;
 opener.dataset.full=img.getAttribute('src');opener.dataset.caption=caption;
}
function selectTab(button, selector) {
 document.querySelectorAll(selector).forEach(el=>{const active=el===button;el.setAttribute('aria-selected',String(active));el.tabIndex=active?0:-1;});
}
document.querySelectorAll('[data-character]').forEach(button=>button.addEventListener('click',()=>{
 selectTab(button,'[data-character]');
 const [asset,caption,title,body,next]=characters[button.dataset.character];
 setImage($('character-image'),$('character-open'),asset,caption,caption);
 $('character-caption').textContent=caption;$('character-title').textContent=title;$('character-text').textContent=body;$('character-next').textContent=next;
 $('character-panel').setAttribute('aria-labelledby',button.id);
}));
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',()=>{
 selectTab(button,'[data-scene]');const index=Number(button.dataset.scene);const [name,ref,goal,change,gap]=scenes[index];
 setImage($('scene-reference'),$('scene-reference-open'),ref,`${name}，AI 设计参考，并非实机。`,`${name}设计参考`);
 setImage($('scene-current'),$('scene-current-open'),`scene-${index+1}`,`${name}，v11 网页实机，制作中。`,`${name}当前实机`);
 $('scene-goal').textContent=goal;$('scene-change').textContent=change;$('scene-gap').textContent=gap;$('scene-panel').setAttribute('aria-labelledby',button.id);
}));
document.querySelectorAll('[role=tablist]').forEach(list=>list.addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
 const tabs=[...list.querySelectorAll('[role=tab]')];let i=tabs.indexOf(document.activeElement);if(i<0)return;
 e.preventDefault();i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
 tabs[i].focus();tabs[i].click();
}));
const grid=$('reference-grid');
refs.forEach(([file,title,category,description])=>{
 const figure=document.createElement('figure');figure.dataset.category=category;
 const button=document.createElement('button');button.className='image-open';button.dataset.full=`assets/${file}.webp`;button.dataset.caption=`${title}，创作者提供的 AI 设计参考，并非项目实机。`;button.setAttribute('aria-label',`放大${title}`);
 const img=document.createElement('img');img.src=button.dataset.full;img.alt=`${title}：${description}`;img.loading='lazy';img.width=1448;img.height=1086;button.append(img);
 const caption=document.createElement('figcaption');const strong=document.createElement('strong');strong.textContent=title;const span=document.createElement('span');span.textContent=description;caption.append(strong,span);figure.append(button,caption);grid.append(figure);
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(el=>{el.classList.toggle('selected',el===button);el.setAttribute('aria-pressed',String(el===button));});
 grid.querySelectorAll('figure').forEach(figure=>figure.hidden=button.dataset.filter!=='all'&&figure.dataset.category!==button.dataset.filter);
}));
let previousFocus;
const dialog=$('image-dialog');const viewer=dialog.querySelector('.viewer-content');
document.addEventListener('click',e=>{
 const button=e.target.closest('.image-open');if(!button)return;
 previousFocus=button;$('viewer-image').src=button.dataset.full;$('viewer-image').alt=button.dataset.caption;$('image-caption').textContent=button.dataset.caption;
 viewer.classList.remove('zoomed');$('zoom-image').textContent='查看原尺寸';dialog.showModal();document.body.style.overflow='hidden';$('close-image').focus();
});
$('close-image').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
$('zoom-image').addEventListener('click',()=>{const zoomed=viewer.classList.toggle('zoomed');$('zoom-image').textContent=zoomed?'适应窗口':'查看原尺寸';});
$('theme-toggle').addEventListener('click',()=>{
 const current=document.documentElement.dataset.theme|| (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
 const next=current==='dark'?'light':'dark';document.documentElement.dataset.theme=next;
 try{localStorage.setItem('nocturne-theme',next);}catch{}
 $('theme-toggle').setAttribute('aria-label',`当前${next==='dark'?'深色':'浅色'}，切换明暗主题`);
});
const video=$('tour-video');video.addEventListener('error',()=>{
 if(document.querySelector('.video-error'))return;
 const message=document.createElement('p');message.className='video-error';message.textContent='录屏暂未加载，请刷新重试，或使用下方链接下载。';video.after(message);
});
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.alt=`图片暂未加载：${img.alt}`;img.classList.add('media-error');}));
