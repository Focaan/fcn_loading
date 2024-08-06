//const EMOJIREGEX = /((?<!\\)<:[^:]+:(\d+)>)|\p{Emoji_Presentation}|\p{Extended_Pictographic}/gmu;
const REGEXDISCORD = /<(?:[^\d>]+|:[A-Za-z0-9]+:)\w+>/g;


const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
    'images/10.jpg'
];

let currentIndex = 0;

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
}

// 5 seconds
setInterval(changeBackgroundImage, 5000);

let count = 0; // Initialize count
let thisCount = 0; // Initialize thisCount

const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
    },

    initFunctionInvoking(data) {
        const progressBar = document.querySelector('.progressBar');
        if (progressBar) {
            progressBar.style.width = ((data.idx / count) * 100) + '%';
        } else {
        }
    },

    startDataFileEntries(data) {
        count = data.count;
    },

    performMapLoadFunction(data) {
        thisCount++;
        const progressBar = document.querySelector('.progressBar');
        if (progressBar) {
            progressBar.style.width = ((thisCount / count) * 100) + '%';
        } else {
    
        }
    },
};



window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});


const processData = (data, selector) => {
	data.forEach((item, index) => {
		let emoji = item.content.match(REGEXDISCORD);
		if (emoji && emoji.length > 0) {
			emoji.forEach(e => {
				let emojiSplit = e.split(":");
				if (emojiSplit.length > 1) {
					let isAnimated = emojiSplit[0].length > 1 ? true : false
					let emojiId = emojiSplit[2].slice(0, -1);
					let url = `<img class="emoji" src="https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? "gif" : "png"}">`;
					item.content = item.content.replaceAll(emojiSplit.join(":"), url)
				} else {
					item.content = item.content.replaceAll(emojiSplit.join(":"), `<span class="unknown">???</span>`)
				}
			});
		}

		let md = marked.parse(item.content)
		// console.log(md)

		let d = new Date(item.timestamp);
		let dateString =
			("0" + d.getDate()).slice(-2) + "/" +
			("0" + (d.getMonth() + 1)).slice(-2) + "/" +
			d.getFullYear() + " " +
			("0" + d.getHours()).slice(-2) + ":" +
			("0" + d.getMinutes()).slice(-2) + ":" +
			("0" + d.getSeconds()).slice(-2);

		$(selector).append(`
			<div class="log">
				<div class="log-header">
					<span>${item.author}</span>
					<small>${dateString}</small>
				</div>
				<div class="log-body">${md}</div>
			</div>
		`);
	});
}
