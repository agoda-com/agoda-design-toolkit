// Disable the context menu
//=====================================================
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function updateWordCount(word) {
    if(word == "$$$NotTextLayer$$$"){
        $('.wordcount').each(function(e){
            $(this).text("Word count: n/a")
        })
    }
    else {
        $('.wordcount').each(function(e){
            $(this).text("Word count: "+word.length)
        })
    }
}

function updateRandomisationBox(randomisation){
    if (randomisation == 'true') {
        $('.randomisation').each(function(e){
            $(this).prop("checked", true);
        })
    }
    else {
        $('.randomisation').each(function(e){
            $(this).prop("checked", false);
        })
    }
}

function getTinyface(handleData) {
    $.ajax({
        url: 'https://tinyfac.es/api/users',
        dataType: 'json',
        success: function(data) {
            var refined = []
            data.forEach(element => {
                refined.push(element.avatars[3].url)
            });
            handleData(refined)
        }
    })
}

function mergeArrays(arrays = []){
	let newArray = []
	for(var i = 0; i < arrays.length; i++){
        if(arrays[i]) {
            newArray = newArray.concat(arrays[i])
        }
	}
	// log(newArray)
	return newArray
}

//UI
//=====================================================
var agodaData = null;

function getAgodaData() {
    $.getJSON("https://github.agodadev.io/pages/pwanpen/Agoda-data/data.json", function(data) {
        agodaData = data
        getTinyface(function(tinyfacesData){
            agodaData.data['images']['tinyfaces'] = tinyfacesData
            // console.log(agodaData)
        })
    })
}
getAgodaData()

$('.tab-action').click(function(e){
    e.stopPropagation()
    $('.tab-action').removeClass('active')
    $(this).addClass('active')
    var action = this.getAttribute("data-action")
    if(action == 'text') {
        $('#textModal').show()
        $('#imageModal').hide()
        $('#translationModal').hide()
        $('#crossoutModal').hide()
    }
    else if (action == 'image') {
        $('#textModal').hide()
        $('#imageModal').show()
        $('#translationModal').hide()
        $('#crossoutModal').hide()
    }
    else if (action == 'translation') {
        $('#textModal').hide()
        $('#imageModal').hide()
        $('#translationModal').show()
        $('#crossoutModal').hide()
    }
    else if (action == 'crossout') {
        $('#textModal').hide()
        $('#imageModal').hide()
        $('#translationModal').hide()
        $('#crossoutModal').show()
    }
})

$('.randomisation').click(function(e){
    if( $(this).is(":checked") ){
        $('.randomisation').each(function(e){
            $(this).prop("checked", true);
        })
    }
    else {
        $('.randomisation').each(function(e){
            $(this).prop("checked", false);
        })
    }
    //send location hash to set user preferrences
    var randomisation =  $('.randomisation').prop("checked")
    var data = {
        "action": "setRamdomisationPref",
        "sub-action": "setRamdomisationPref",
        "data": null,
        "randomisation": randomisation,
        "date": new Date().getTime()
    }
    // Put the JSON as a string in the hash
    window.location.hash = JSON.stringify(data);
})

$('.sender').click(function(e){
    e.stopPropagation()
    var action = this.getAttribute("data-action")
    var sub = this.getAttribute("sub-action")
    var randomisation = $('.randomisation').prop("checked")
    var targetArray

    if(action == "translate"){
        var selectedIndex = document.getElementById("langSelection").selectedIndex;
        var options = document.getElementById("langSelection").options;
        targetArray = options[selectedIndex].value
    }
    else if (action == "crossout"){
        var originalInput = document.getElementById("originalInput").value
        var discountInput = document.getElementById("discountInput").value
        targetArray = {
            original: originalInput,
            discount: discountInput
        }
    }
    else if (action == "images"){
        targetArray = agodaData.data[action][sub]
    }
    else {
        try{
            if(sub == "single"){
                targetArray = agodaData.data[action]
            }
            else if(agodaData.data[action]){
                targetArray = mergeArrays([
                    agodaData.data[action]["short"],
                    agodaData.data[action]["medium"],
                    agodaData.data[action]["long"],
                ])
            }
        }
        catch(e){
            targetArray = null
        }
    }

    // console.log(targetArray)

    var data = {
        "action": action,
        "sub-action": sub,
        "data": targetArray,
        "randomisation": randomisation,
        "date": new Date().getTime()
    }

    // console.log(data)
    // Put the JSON as a string in the hash
    window.location.hash = JSON.stringify(data);
})  
