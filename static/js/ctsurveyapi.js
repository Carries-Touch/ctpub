function SendMessageAndroid(e){window.application&&window.application.sendAppMessage&&window.application.sendAppMessage(e)}function SendMessageIOS(e){window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.application&&window.webkit.messageHandlers.application.postMessage(e)}function SurveyRunner(e,t,a){const n=`ct-survey:${e}`;function o(){window.localStorage.setItem(n,JSON.stringify({completed:"completed"==d.state,pageNo:d.currentPageNo,data:d.data}))}function s(e,t){message=JSON.stringify({name:e,content:t}),SendMessageAndroid(message),SendMessageIOS(message)}const d=new Survey.Model(t);var i;(i=window.localStorage.getItem(n)||null)&&(i=JSON.parse(i),d.data=i.data,i.completed?d.doComplete():i.pageNo&&(d.start(),d.currentPageNo=i.pageNo)),d.onValueChanged.add(o),d.onCurrentPageChanged.add(o),d.onStarted.add(o),$("#surveyContainer").Survey({model:d}),d.onAfterRenderQuestion.add((()=>{if(d.isShowStartingPage)document.getElementsByTagName("body")[0].classList.add("start");else{const e=document.getElementsByTagName("body")[0];e.classList.remove("question-"+d.currentPageNo),e.classList.add("question","question-"+(d.currentPageNo+1))}})),d.onComplete.add((function(){document.getElementsByTagName("body")[0].classList.add("complete"),o();var e=[];for(const[t,a]of Object.entries(d.data)){const n=d.getQuestionByName(t);n&&n.choices.filter((t=>{t.jsonObj.value==a&&e.push({question:n.title,answer:t.jsonObj})}))}var t={answers:e};if(a.onCollectCompleteMessageData){const e=a.onCollectCompleteMessageData(d);t={...t,...e}}s("complete",t)})),$(document).on("click",".template-action-button.start-quiz",(e=>{d.start()})),$(document).on("click",".template-action-button.restart-quiz",(e=>{window.localStorage.removeItem(n),d.clear()})),window.previousPage=function(){return"completed"!=d.state&&d.prevPage()}}
