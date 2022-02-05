const $siteList = $('.siteList');
const $lastlist = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
let hashMap = xObject || [
    { logo: 'B', logotype: 'text', url: 'https://www.baidu.com', link: 'baidu.com' },
    { logo: 'G', logotype: 'text', url: 'https://www.google.com', link: 'google.com' },
];
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        // if (node.logotype === 'text') {
        if (index % 2 !== 0) {
            let $li = $(`<li>
                <div class="site" style="background:pink">
                 <div class="logo">${node.logo}</div>
                 <div class="close">
                    <svg class="icon">
                         <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                 <div class="link">${node.link}</div>
                </div>
                </li>`).insertBefore($lastlist)
            $li.on('click', () => {
                window.open(node.url)
            })
            $li.on('click', '.close', (e) => {
                e.stopPropagation();//阻止冒泡
                hashMap.splice(index, 1);
                render();
            })
        } else {
            let $li = $(`<li>
                <div class="site" style="background:white">
                 <div class="logo">${node.logo}</div>
                 <div class="close">
                    <svg class="icon">
                         <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                 <div class="link">${node.link}</div>
                </div>
                </li>`).insertBefore($lastlist)
            $li.on('click', () => {
                window.open(node.url)
            })
            $li.on('click', '.close', (e) => {
                e.stopPropagation();//阻止冒泡
                hashMap.splice(index, 1);
                render();
            })
        }

    });
};
render();
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入需要添加的网址')
        if (url.indexOf('https') !== 0) {
            url = url.replace('www.', '').replace(/\/.*/, ''),
                link = url.replace('https://', '');
            logo = link[0];
            url = 'https://www.' + url;

        } else {
            link = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
            logo = link[0];
            logoType = 'text';
            url = url
        }
        hashMap.push({
            logo: logo,
            logoType: 'text',
            url: url,
            link: link,
            // link: link.replace('https://', '').replace('http://', '').replace('www.', ''),
        });
        render()
    });
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const key = e.key;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo === key) {
            window.open(hashMap[i].url)
        }
    }
})


