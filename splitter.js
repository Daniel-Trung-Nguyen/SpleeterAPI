var buttonSplit=$('#btn-split');var max_duration_mins=0x1e;var ngrokAPI='9e558958';var split_yt_api='https://'+ngrokAPI+'.ngrok.io/yt';var split_mp3_api='https://'+ngrokAPI+'.ngrok.io/mp3';var selectedFiles=[];var dropzone;var dzError=![];window['OnLoadCallback']=()=>{let _0x3196d8=getCookie('spleeter_gapikey');if(_0x3196d8){gapi['client']['setApiKey'](_0x3196d8);}else{try{_0x3196d8=CryptoJS['AES']['decrypt']('U2FsdGVkX1/YO06ep/mFGZGtIcASWlhidpcerOBsLehPAijwiWuK4mK7AFlx/VY19QAXtEvtEusr6nNGUcJ/Fg==',('uoyk'+'cuf')['split']('')['reverse']()['join'](''))['toString'](CryptoJS['enc']['Utf8']);}finally{gapi['client']['setApiKey'](_0x3196d8);setCookie('spleeter_gapikey',_0x3196d8);}}$('#div-search')['show']();$('#extra-buttons')['show']();};$(document)['ready'](function(){makeTabs();setupDropFilesBox();$('#type')['on']('change',function(){let _0x51e3cc=$(this)['val']();$('#div-stems\x20div:not(._'+_0x51e3cc+')')['hide']();$('#div-stems\x20div._'+_0x51e3cc)['show']();});setInputsFromCookie();$('#btn-close-wait')['on']('click',function(){stopWait();});buttonSplit['on']('click',onSplit);$('#btn-search')['on']('click',onYoutubeSearch);$(document)['on']('mouseenter','.clickable,\x20.file-clickable',function(){$(this)['css']('opacity','.5');});$(document)['on']('mouseleave','.clickable,\x20.file-clickable',function(){$(this)['css']('opacity','1');});$(document)['on']('click','.clickable',function(){let _0x587409=$(this)['attr']('title');if(_0x587409){$('#url')['val'](_0x587409);$('#accordion')['accordion']('option','active',![]);$('#btn-split')['focus']();getYoutubeVideoDuration(_0x587409,function(_0x844d6e,_0x4261ce){$('#duration')['text'](_0x844d6e);$('#video-title')['text'](_0x4261ce);$('#video-info')['show']();let _0x28fedc=parseInt(_0x844d6e['split'](':')[0x0])*0x3c+parseInt(_0x844d6e['split'](':')[0x1]);if(_0x28fedc>max_duration_mins){$('#duration')['css']('color','red');}else{$('#duration')['css']('color','black');}$('#duration')['show']();});}});$('#url')['keypress'](function(_0x29911e){var _0x1064cd=_0x29911e['which'];if(_0x1064cd===0xd){$('#btn-split')['click']();return![];}});$('#search')['keypress'](function(_0x541fb9){var _0x4d9bad=_0x541fb9['which'];if(_0x4d9bad===0xd){$('#btn-search')['click']();return![];}});$('#type')['change']();$('#div-stems')['show']();});function setInputsFromCookie(){let _0xbefaba=getCookie('spleeter_format');if(_0xbefaba){if(_0xbefaba['endsWith']('stems')){$('#type')['val'](_0xbefaba);}else{$('#type')['val']('4stems');}}else{$('#type')['val']('4stems');}let _0x68623c=getCookie('spleeter_hf');$('#chk-hf')['prop']('checked',_0x68623c==='true');let _0xb57e67=getCookie('spleeter_stems');if(_0xb57e67){$('#div-stems\x20input')['prop']('checked',![]);_0xb57e67['split'](',')['forEach'](_0x114e55=>$('#div-stems\x20input#toggle-'+_0x114e55)['prop']('checked',!![]));}let _0x1a8865=getCookie('spleeter_output');$('input#rad-'+_0x1a8865)['prop']('checked',!![]);}function setCookieFromInput(){let _0x262955=$('#type')['val']();setCookie('spleeter_format',_0x262955,0x1e);setCookie('spleeter_hf',$('#chk-hf')['is'](':checked')?'true':'false',0x1e);var _0x437421=[];$('#div-stems\x20input')['filter'](':checked')['each'](function(){_0x437421['push'](this['value']);});setCookie('spleeter_stems',_0x437421['join'](','));let _0x106068=$('input[name=\x27output-type\x27]:checked')['val']();if(_0x106068){setCookie('spleeter_output',_0x106068['slice'](0x1));}}function makeTabs(){$('#tabs-nav\x20li:first-child')['addClass']('active');$('.tab-content')['hide']();$('.tab-content:first')['show']();$('#tabs-nav\x20li')['click'](function(){$('#tabs-nav\x20li')['removeClass']('active');$(this)['addClass']('active');$('.tab-content')['hide']();var _0x5aa928=$(this)['find']('a')['attr']('href');$(_0x5aa928)['fadeIn']();let _0x238abd=$('#tab1')['is'](':visible');if(_0x238abd){$('#container-stems')['show']();$('#container-output')['show']();if(getCookie('spleeter_gapikey')){$('#extra-buttons')['show']();}}else{$('#container-stems')['hide']();$('#container-output')['hide']();$('#extra-buttons')['hide']();}return![];});}async function onYoutubeSearch(){let _0x5e7080=$('#search')['val']();if(!_0x5e7080){return;}if(_0x5e7080['length']<0x3){return;}$(this)['attr']('disabled',!![]);$('#search-results')['empty']();try{let _0x418b73=await gapi['client']['request']({'path':'youtube/v3/search','params':{'q':_0x5e7080,'part':'snippet','maxResults':0x14,'type':'video','videoCaption':$('#chk-cc')['is'](':checked')?'closedCaption':'any'}});let _0x998e90=_0x418b73['result'];for(let _0x5a3f56 in _0x998e90['items']){if(_0x998e90['items'][_0x5a3f56]['id']['videoId']){$('<div/>',{'id':'result'+_0x5a3f56,'class':'clickable','title':_0x998e90['items'][_0x5a3f56]['id']['videoId']})['appendTo']('#search-results');$('<img/>',{'src':_0x998e90['items'][_0x5a3f56]['snippet']['thumbnails']['default']['url']})['appendTo']('#result'+_0x5a3f56);$('<span/>',{'html':_0x998e90['items'][_0x5a3f56]['snippet']['title']})['appendTo']('#result'+_0x5a3f56);}}$('#search-results')['css']('height','');$('#search-results')['show']();$('#search-section')['show']();$('#accordion')['accordion']({'collapsible':!![],'header':'#accordion-header','active':0x0});}catch(_0x2cad83){if(_0x2cad83['result']['error']['errors'][0x0]['reason']==='keyInvalid'){removeCookie('spleeter_gapikey');alert('Invalid\x20YouTube\x20API\x20key');location['reload']();}else{alert(_0x2cad83['result']['error']['errors'][0x0]['message']);}}$(this)['removeAttr']('disabled');}function validateUrl(){let _0x3afb22=$('#url')['val']();if(_0x3afb22['length']===0x0){return null;}if(_0x3afb22['includes']('.')){if(!_0x3afb22['toLowerCase']()['includes']('youtu.be')&&!_0x3afb22['toLowerCase']()['includes']('youtube.com')){alert('Invalid\x20URL.\x20Not\x20a\x20valid\x20youtube\x20URL');return null;}if(_0x3afb22['toLowerCase']()['includes']('youtu.be')){let _0x378032=_0x3afb22['match'](/youtu\.be\/([^\?]*)/);if(_0x378032){return _0x378032[0x1];}else{alert('Cannot\x20parse\x20video\x20ID\x20from\x20youtu.be\x20URL');}}else{let _0x371f58=_0x3afb22['match'](/v=([^&]*)/);if(_0x371f58){return _0x371f58[0x1];}else{alert('Cannot\x20parse\x20video\x20ID\x20from\x20youtube.com\x20URL');}}}if(_0x3afb22['length']<0xa){alert('Invalid\x20URL');return null;}if(_0x3afb22['length']>0xc){alert('Invalid\x20youtube\x20video\x20ID');return null;}return _0x3afb22;}async function getYoutubeVideoDuration(_0x355975,_0x355793){let _0x4a612c=await gapi['client']['request']({'path':'youtube/v3/videos','params':{'id':_0x355975,'part':'contentDetails,snippet'}});let _0x5a23a2=_0x4a612c['result'];if(_0x5a23a2&&_0x5a23a2['items']&&_0x5a23a2['items']['length']>0x0&&_0x5a23a2['items'][0x0]['contentDetails']){_0x355793(YTDuration(_0x5a23a2['items'][0x0]['contentDetails']['duration']),_0x5a23a2['items'][0x0]['snippet']['title']);}else{stopWait();alert('Video\x20ID\x20not\x20found.\x20Reponse:\x20'+JSON['stringify'](_0x5a23a2));}}function YTDuration(_0x427eef){var _0x4d5d78=_0x427eef['match'](/PT(\d+H)?(\d+M)?(\d+S)?/);_0x4d5d78=_0x4d5d78['slice'](0x1)['map'](function(_0x5e2871){if(_0x5e2871!==undefined&&_0x5e2871!==null){return _0x5e2871['replace'](/\D/,'');}});var _0x1c2a46=parseInt(_0x4d5d78[0x0])||0x0;var _0x3a9afc=parseInt(_0x4d5d78[0x1])||0x0;var _0x1c9f02=parseInt(_0x4d5d78[0x2])||0x0;let _0xd6aba4=('0'+_0x1c2a46)['slice'](-0x2)+':'+('0'+_0x3a9afc)['slice'](-0x2)+':'+('0'+_0x1c9f02)['slice'](-0x2);return _0xd6aba4;}function startWait(){$('#spinner')['show']();$('div.dz-preview')['css']('z-index','0');$('#wait-dialog')['modal']({'escapeClose':![],'clickClose':![],'showClose':![],'fadeDuration':0x64});$('#btn-split')['hide']();$('#btn-file-split')['hide']();$('#btn-split')['attr']('disabled',!![]);$('#div-main')['find']('*')['addClass']('wait');}function stopWait(){$('div.dz-preview')['css']('z-index','auto');$('#spinner')['hide']();$('#btn-split')['show']();$('#btn-file-split')['show']();$('#btn-split')['removeAttr']('disabled');$('#div-main')['find']('*')['removeClass']('wait');$('#duration')['hide']();$('#video-info')['hide']();$['modal']['close']();$('#wait-dialog')['hide']();}function setCookie(_0x869fe9,_0x22f6e1,_0x3835f2){return localStorage['setItem'](_0x869fe9,_0x22f6e1);}function getCookie(_0x15ab3f){return localStorage['getItem'](_0x15ab3f);}function removeCookie(_0x10cef3){localStorage['removeItem'](_0x10cef3);}function setupDropFilesBox(){$('#uploader')['addClass']('dropzone');dropzone=new Dropzone('#uploader',{'url':split_mp3_api+'/p','paramName':'file','maxFilesize':0xc,'maxFiles':0x5,'timeout':0x927c0,'clickable':!![],'acceptedFiles':'.mp3','uploadMultiple':!![],'createImageThumbnails':![],'parallelUploads':0x5,'autoProcessQueue':![],'dictDefaultMessage':'Drop\x20.mp3\x20files\x20or\x20click\x20to\x20upload','successmultiple':onFileSplitCompleted,'errormultiple':function(_0x1f8a3f,_0x24e7be){if(!dzError){dzError=!![];stopWait();alert('Some\x20files\x20cannot\x20be\x20processed:\x0a'+_0x24e7be);}}});}function onSplit(){let _0x4a89f7=$('#tab1')['is'](':visible');if(_0x4a89f7){onYoutubeSplit();}else{onFileSplit();}var _0xa70ba6=localStorage['getItem']('usrCount');_0xa70ba6=parseInt(_0xa70ba6);if(_0xa70ba6>0x0){_0xa70ba6=_0xa70ba6-0x1;localStorage['setItem']('usrCount',_0xa70ba6);}var _0xf4bbbb=localStorage['getItem']('usrEm');if(_0xf4bbbb!=''&&_0xf4bbbb!=null){_0xf4bbbb=_0xf4bbbb['replace'](/"/g,'');checkX(_0xf4bbbb,_0xa70ba6);}else{document['getElementById']('btn-split')['disabled']=!![];document['getElementById']('btn-split')['innerHTML']='Please\x20sign\x20in!';document['getElementById']('sub')['innerHTML']='Click\x20to\x20Subscribe';}}function onFileSplit(){if(dropzone['getQueuedFiles']()['length']===0x0){return;}let _0x21a25b=$('#type')['val']();$('#file-format')['val'](_0x21a25b);$('#file-hf')['val']($('#chk-hf')['is'](':checked'));startWait();setCookieFromInput();dzError=![];dropzone['processQueue']();}function onFileSplitCompleted(_0x230bd8,_0x21fe17){stopWait();dropzone['removeAllFiles']();if(_0x21fe17['error']){dzError=!![];alert(_0x21fe17['error']);}else{console['log']('Successful\x20split:\x20'+JSON['stringify'](_0x21fe17));let _0x2b23c5=split_mp3_api+'/d?fn='+encodeURIComponent(_0x21fe17['fileId']);window['open'](_0x2b23c5);}}function onYoutubeSplit(){let _0x3a3b4a=validateUrl();if(!_0x3a3b4a){return;}let _0x3e432d=$('#type')['val']();if(_0x3a3b4a===null||_0x3e432d===null){alert('Please\x20select\x20a\x20video\x20and\x20format');return;}setCookieFromInput();split(_0x3a3b4a,_0x3e432d);}function split(_0x52cc9f,_0x1929eb){let _0x32a752=split_yt_api+'/p';let _0x3ce19f=$('#div-stems\x20input:visible')['filter'](':checked')['map'](function(){return this['value'];})['get']();if(_0x3ce19f['length']===0x0){alert('Must\x20select\x20at\x20least\x20one\x20stem');return;}startWait();let _0x1943c3=$('input[name=\x27output-type\x27]:checked')['val']();if(!_0x1943c3){_0x1943c3='.zip';}let _0x29dc94=$('#chk-hf')['is'](':checked');$('#btn-split')['blur']();$['ajax']({'url':_0x32a752,'type':'POST','dataType':'json','contentType':'application/json','data':JSON['stringify']({'vid':_0x52cc9f,'baseFormat':$('#type')['val'](),'subFormats':_0x3ce19f,'extension':_0x1943c3,'options':{'includeHighFrequencies':_0x29dc94}}),'success':function(_0x30bce2){stopWait();if(_0x30bce2['error']){alert(_0x30bce2['error']);}else{console['log']('Successful\x20split:\x20'+JSON['stringify'](_0x30bce2));let _0x37d876='?sub='+_0x3ce19f['join'](',')+'&ext='+_0x1943c3+'&hf='+_0x29dc94;let _0x4279ad=split_yt_api+'/d/'+_0x1929eb+'/'+_0x52cc9f+_0x37d876;window['open'](_0x4279ad);}},'error':function(_0x2a107d,_0x27ee9f,_0xefa2db){stopWait();alert('Error\x20processing\x20'+_0x52cc9f+':\x0a'+(_0x2a107d['responseText']?_0x2a107d['responseText']:_0x27ee9f));}});}function presetClick(_0x30f465){if(_0x30f465==='audio-karaoke'){$('#type')['val']('2stems');$('#type')['change']();$('#div-stems\x20input')['prop']('checked',![]);$('#div-stems\x20input#toggle-accompaniment')['prop']('checked',!![]);$('input#rad-mp3')['prop']('checked',!![]);}else if(_0x30f465==='video-karaoke'){$('#type')['val']('2stems');$('#type')['change']();$('#div-stems\x20input')['prop']('checked',![]);$('#div-stems\x20input#toggle-accompaniment')['prop']('checked',!![]);$('input#rad-mp4')['prop']('checked',!![]);}else if(_0x30f465==='audio-vocals'){$('#type')['val']('2stems');$('#type')['change']();$('#div-stems\x20input')['prop']('checked',![]);$('#div-stems\x20input#toggle-vocals')['prop']('checked',!![]);$('input#rad-mp3')['prop']('checked',!![]);}else if(_0x30f465==='default'){$('#type')['val']('4stems');$('#type')['change']();$('#div-stems\x20input')['prop']('checked',!![]);$('input#rad-zip')['prop']('checked',!![]);}return![];}function originalDownloadClick(_0xadbd9d){let _0x2ad885=validateUrl();if(!_0x2ad885){return![];}let _0x48cca9;if(_0xadbd9d==='audio'){_0x48cca9=split_yt_api+'/dda/'+_0x2ad885;}else{_0x48cca9=split_yt_api+'/ddv/'+_0x2ad885;}window['open'](_0x48cca9);return![];}function checkX(_0x2a0ce2,_0x339c33){var _0x332d08='https://docs.google.com/spreadsheets/d/1Wp3S-nU4EE5cZQ6aofOdcowvl8MdRj351Iq6QQdPLds/export?format=csv&gid=0';activeStatus(_0x332d08,_0x2a0ce2,_0x339c33);}function activeStatus(_0xa09405,_0x250469,_0x592bdb){var _0x2b3c19=new XMLHttpRequest();_0x2b3c19['open']('GET',_0xa09405,!![]);_0x2b3c19['onreadystatechange']=function(){if(_0x2b3c19['readyState']===0x4){if(_0x2b3c19['status']===0xc8||_0x2b3c19['status']==0x0){var _0x515031=_0x2b3c19['responseText'];console['log'](_0x515031);if(_0x515031['indexOf'](_0x250469)>-0x1){document['getElementById']('btn-split')['disabled']=![];document['getElementById']('btn-split')['innerHTML']='Execute';document['getElementById']('sub')['innerHTML']='Subscribed';}else{if(_0x592bdb<0x1){alert('You\x20have\x20'+_0x592bdb+'\x20credit\x20left.\x0aPlease\x20subscribe\x20to\x20unlock\x20unlimited\x20access.');document['getElementById']('btn-split')['disabled']=!![];document['getElementById']('btn-split')['innerHTML']='Subscribe\x20to\x20enable';}else{alert('You\x20have\x20'+_0x592bdb+'\x20credit(s)\x20left');document['getElementById']('btn-split')['disabled']=![];document['getElementById']('btn-split')['innerHTML']='Execute';}}}}};_0x2b3c19['send'](null);}