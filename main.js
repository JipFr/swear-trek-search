
const url = `https://api.giphy.com/v1/gifs/search?api_key=1wwNNO66hKokAFyXJQ7JJAkPNsz8Ibxp&limit=25&offset=0`

function search(q) {
	fetch(`${url}&q=swear_trek ${q}`).then(d => d.json()).then(d => {
		
		let results = d.data.filter(result => result.username === "Swear_Trek");
		
		document.querySelector(".results").innerHTML = 
			results.map(result => `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="${result.images.original.url.split("?")[0]}">`).join("");

		next_img();

	});
}

function next_img() {
	let img = document.querySelector("[data-src]");
	if(!img) return;
	img.src = img.dataset.src;
	img.removeAttribute("data-src");
	img.onload = next_img;
}

function init() {
	document.querySelector(".search").addEventListener("input", evt => {
		search(evt.currentTarget.value);
	});
	search("");
}

window.addEventListener("load", init);
