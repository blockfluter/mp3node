function play(element)
{
	document.getElementById('audio').src = element.dataset.path;
	var classname = 'active';
	var els = document.getElementsByClassName(classname);
	for (var i = 0; i < els.length; ++i){
		els[i].classList.remove(classname);
	}
	element.classList.add(classname);
}
function download(element)
{
	var link = document.createElement('a');
	link.href = element.dataset.path;
	link.click();
}
