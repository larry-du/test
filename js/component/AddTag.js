const content = document.querySelector("#content");

function addTitleTag({titleTag,createSubButton}) {
	content.insertAdjacentHTML('beforeend', titleTag);
	const [...titles] = document.querySelectorAll(".title");
	const lastData = titles[titles.length-1];
	lastData.addEventListener("click", (event) => {
			addToolbar(event.currentTarget,createSubButton);
		});
}

function addTextTag({ textType, textTag,createSubButton}) {
	content.insertAdjacentHTML('beforeend', textTag);
	const [...texts] = document.querySelectorAll(`.${textType}-text`);
	const lastData = texts[texts.length-1];
		lastData.addEventListener("click", (event) => {
			addToolbar(event.currentTarget,createSubButton);
		});
}

function addListTag({listTitle,createSubButton}) {
	content.insertAdjacentHTML('beforeend', listTitle);
	const [...listTitles] = document.querySelectorAll(".listTitle");
	const lastData = listTitles[listTitles.length-1];

	lastData.addEventListener("click", (event) => {
		const isItem = event.target.classList.contains("listLi");
		if (isItem)return addToolbar(event.target,createSubButton);
		addToolbar(event.currentTarget,createSubButton);
	})
}

function addTableTag({ row, col }, { createTableArea,createTbody,createTr,createTd },createSubButton) {
	content.insertAdjacentHTML('beforeend', createTableArea());
	// document.documentElement.style.setProperty('--tableWidth', `${100/col}%`);

	const totalRow = Array(Number(row)).fill(0);
	const totalCol = Array(Number(col)).fill(0);

	const [...tableForms] = document.querySelectorAll(".tableForm");
	const lastData = tableForms[tableForms.length - 1];
	lastData.insertAdjacentHTML('beforeend', createTbody());
	const tbody = lastData.querySelector(".tbody");

	totalRow.forEach((rowData, rowIndex) => {
		tbody.insertAdjacentHTML('beforeend', createTr(rowIndex));
		const rowItem = tbody.querySelector(`.rowItem-${rowIndex + 1}`);
		totalCol.forEach(() => {
			rowItem.insertAdjacentHTML('beforeend', createTd());
		})
	})

	const [...tdLists] = document.querySelectorAll(".tdList");
	tdLists.forEach(tdList=>{
		tdList.addEventListener("click",(event)=>{
			addToolbar(event.currentTarget.parentNode,createSubButton);
		})
	})
}

function addLastPositionImg(createImgUpload,createImage){
	content.insertAdjacentHTML('beforeend', createImgUpload());
	const imgUpload = document.querySelector(".imgUpload");
	imgUpload.addEventListener("change",(event)=>{
		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.addEventListener('load',(dataEvent)=>{
				const uploadArea = content.querySelector(".uploadArea");
				content.insertAdjacentHTML('beforeend',createImage(dataEvent.target.result));
				uploadArea.remove();
		})
  })
}

function addRandomImg(currentFocus,createImgUpload,createImage){
  const currentParent = currentFocus.parentNode
	if(currentParent.localName==="button") return alert("點擊編輯區");
	if(currentParent.localName ==="tr"){
		currentFocus.insertAdjacentHTML('beforeend',createImgUpload());
	}else{
		currentParent.insertAdjacentHTML('beforeend',createImgUpload());
	}
  const imgUpload = document.querySelector(".imgUpload");
  imgUpload.addEventListener("change",(e)=>{
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load',(event)=>{
			const uploadArea = content.querySelector(".uploadArea");
			if(currentParent.localName==="tr"){
				currentFocus.insertAdjacentHTML('beforeend',createImage(event.target.result));
			}else{
				currentParent.insertAdjacentHTML('beforeend',createImage(event.target.result));
			}
      // currentParent.insertAdjacentHTML('beforeend',createImage(event.target.result))
			uploadArea.remove();
    })
  })
}

function addCardGroup(createCard,createCardImg,createSubButton){
	content.insertAdjacentHTML('beforeend', createCard);
	const imgUpload = document.querySelector(".imgUpload");
	const [...cardBodys] = document.querySelectorAll(".cardBody");
	const lastData = cardBodys[cardBodys.length-1];
	imgUpload.addEventListener("change",(event)=>{
		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.addEventListener('load',(dataEvent)=>{
				const uploadArea = content.querySelector(".uploadArea");
				const cardImg = content.querySelector(".cardImg");
				cardImg.insertAdjacentHTML('afterbegin',createCardImg(dataEvent.target.result));
				uploadArea.remove();
		})
  })

	lastData.addEventListener("click", (event) => {
		const isCardTitle = event.target.parentNode.classList.contains("cardTitle");
		const isCardItem = event.target.parentNode.classList.contains("cardText");
		if (isCardTitle) addToolbar(event.target,createSubButton);
		if (isCardItem) addToolbar(event.target,createSubButton);
	})

}

function addToolbar(currentDom,createSubButton){
  const isCollapse = window.getSelection().isCollapsed;
	const checkSubButtonArea =document.querySelector(".subButtonArea");
	const isShowLinkButton = currentDom.classList.contains("showLink");
	const isShowBoldButton = currentDom.classList.contains("showBold");
	const isShowHighLightButton = currentDom.classList.contains("showHighLight");
	const isForTextLeft = currentDom.classList.contains("forTextLeft");
	const isForTextCenter = currentDom.classList.contains("forTextCenter");
	const isForTextRight = currentDom.classList.contains("forTextRight");
	// console.log(currentDom);
	// const isShowNormalButton = currentDom.classList.contains("showNormal");
	if (isCollapse||
		isShowLinkButton||
		isShowBoldButton||
		isShowHighLightButton||
		isForTextLeft||
		isForTextCenter||
		isForTextRight) return
	if(checkSubButtonArea)checkSubButtonArea.remove();

	const selectedString = window.getSelection().toString();
	// const isEmpty = /\s/.test(`${selectedString}`);
	// if (isEmpty) return
	currentDom.insertAdjacentHTML('beforeend',createSubButton());
	const [...subButtonAreas] = document.querySelectorAll(".subButtonArea");
	const lastData = subButtonAreas[subButtonAreas.length-1];
	lastData.addEventListener("click",(event)=>{
		bindingToolBar(event,currentDom,selectedString.trim());
	})
}

function bindingToolBar(event,currentDom,selectedString){
	const currentButton = event.target;
	const isLink = event.target.classList.contains("showLink");
	const isBold = event.target.classList.contains("showBold");
	const isHighLight = event.target.classList.contains("showHighLight");
	const isTextLeft = event.target.classList.contains("forTextLeft");
	const isTextCenter = event.target.classList.contains("forTextCenter");
	const isTextRight = event.target.classList.contains("forTextRight");
	// const isNormal = event.target.classList.contains("showNormal");
	if(isLink){
		currentButton.addEventListener("click",addLinkAddress(currentDom,selectedString));
	}
	if(isBold){
		currentButton.addEventListener("click", addBold(currentDom,selectedString));
	}
	if(isHighLight){
		currentButton.addEventListener("click", addHighLight(currentDom,selectedString));
	}
	if(isTextLeft){
		currentButton.addEventListener("click", addTextPosition("left",currentDom));
	}
	if(isTextCenter){
		currentButton.addEventListener("click", addTextPosition("center",currentDom));
	}
	if(isTextRight){
		currentButton.addEventListener("click", addTextPosition("right",currentDom));
	}
	// if(isNormal){
	// 	currentButton.addEventListener("click", addNormal(currentDom,selectedString));
	// }
}
// function addNormal(currentDom,selectedString){
// 	currentDom.innerHTML = currentDom.innerHTML.replace(
// 		`<span class="targetText">${selectedString}</span>`,
// 		`${selectedString}`
// 	);
// 	currentDom.querySelector(".subButtonArea").remove();
// }
function addTextPosition(textPosition,currentDom){
	currentDom.setAttribute("style", `text-align:${textPosition}`)
	document.querySelector(".subButtonArea").remove();
}

function addHighLight(currentDom,selectedString){
	const checkTargetText = currentDom.querySelector(".targetText");
	if(checkTargetText) {
		const checkHighLight = checkTargetText.classList.contains("highLight");
		checkHighLight? "" : checkTargetText.classList.add("highLight");
		return document.querySelector(".subButtonArea").remove();
	}
	currentDom.innerHTML = currentDom.innerHTML.replace(
		`${selectedString}`,
		`<span class="targetText">${selectedString}</span>`
	);
	const targetText = currentDom.querySelector(".targetText");
	targetText.classList.add("highLight");
	document.querySelector(".subButtonArea").remove();
}

function addBold(currentDom,selectedString){
	const checkTargetText = currentDom.querySelector(".targetText");
	if(checkTargetText) {
		const checkBold = checkTargetText.classList.contains("bold");
		checkBold? "" : checkTargetText.classList.add("bold");
		return document.querySelector(".subButtonArea").remove();
	}
	currentDom.innerHTML = currentDom.innerHTML.replace(
		`${selectedString}`,
		`<span class="targetText">${selectedString}</span>`
	);
	const targetText = currentDom.querySelector(".targetText");
	targetText.classList.add("bold");
	document.querySelector(".subButtonArea").remove();
}

function addLinkAddress(currentDom,selectedString){
	// const subButtonArea = currentButton.parentNode;
	console.log(selectedString);
	const subButtonArea = currentDom.querySelector(".subButtonArea");
	// const subButtonArea = currentDom.querySelector(".subButtonArea");
	// subButtonArea.insertAdjacentHTML('beforeend',`<input class="typeAddress">`);
	// console.log(subButtonArea);
	const typeAddress = subButtonArea.querySelector(".typeAddress");
	typeAddress.classList.remove("noShow")
	typeAddress.addEventListener("change",(typeAddressEvent)=>{
		const webAddress = typeAddressEvent.target.value;
		typeAddress.addEventListener("keyup",(keyEvent)=>{
			if (keyEvent.key === "Enter"){
				currentDom.innerHTML = currentDom.innerHTML.replace(
					`${selectedString}`,
					`<a href="${webAddress}">${selectedString}</a>`
				);
				// typeAddress.classList.add("noShow")
				document.querySelector(".subButtonArea").remove();
			}
		})
	})
}

function addIframeTag(linkAddress,createIframe){
	content.insertAdjacentHTML('beforeend', createIframe(linkAddress));
}

content.addEventListener("click", (event) => {
	const isClose = event.target.classList.contains("close");
	if (isClose) event.target.parentNode.remove();
})

export { 
	addTextTag, 
	addTitleTag, 
	addListTag, 
	addTableTag,
	addIframeTag,
  addRandomImg,
	addLastPositionImg,
	addCardGroup 
}