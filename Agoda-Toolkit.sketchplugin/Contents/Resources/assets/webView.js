// Disable the context menu
//=====================================================
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

function addPopup(e){
    var action = $(e).attr('data-action')
    var newPopup = $(popupTemplate).appendTo('body')
    newPopup.attr('parent-btn', action)
    var child = newPopup.children('.content')
    var options = []
    switch (action) {
        case "address":
            options = ["short", "medium", "long"]
            break;

        case "currency":
            options = ["short", "medium", "long"]
            break;

        case "weather":
            options = ["short", "medium", "long"]
            break;

        case "phone":
            options = ["GB", "US"]
            break;

        case "dates":
            options = ["short"]
            break;

        case "images":
            options = ["property", "facilities", "room"]
            break;

        case "translate":
            break;
    
        default:
            options = ["short", "medium", "long"]
            break;
    }

    for(var i = 0; i < options.length; i++){
        var subAction = options[i]
        child.append('<button class="btn a-2 sender" data-action="'+action+'" sub-action="'+subAction+'">'+subAction+'</button>')
    }

    
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function openPopup(e) {
    // console.log(e.target.offsetTop)
    // console.log(e.target.offsetLeft)

    var eTop = e.target.offsetTop
    var eLeft = e.target.offsetLeft
    var eHeight = e.target.clientHeight
    var eWidth = e.target.clientWidth

    var newXpostion = eTop+eHeight+6
    var arrowPosition = eLeft+(eWidth/2)-2

    var action = e.target.getAttribute("data-action")
    var popup = $('.popup[parent-btn="'+action+'"]')
    var arrow = popup.children('.arrow')
    if(popup.is(":visible")){
        popup.hide() 
    }
    else {
        $('.popup').hide()
        popup.show()
    }

    popup.css({
        "top":"0",
        "left":"0",
        "transform": "translate(0, "+newXpostion+"px)"
    })
    arrow.css({
        "left":"0",
        "transform":"translate("+arrowPosition+"px, -50%)  rotate(45deg)"
    })
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

//UI
//=====================================================
var agodaData = null;

function getAgodaData() {
    $.getJSON("https://github.agodadev.io/pages/pwanpen/Agoda-data/data.json", function(data) {
        agodaData = data
        getTinyface(function(tinyfacesData){
            agodaData.data['images']['tinyfaces'] = tinyfacesData
            console.log(agodaData)
        })
    })
}
getAgodaData()

var popupTemplate =
`
    <div class="popup">
        <div class="arrow"></div>
        <div class="content">
        </div>
    </div>
`

$('.w-sub').each(function(){
    addPopup(this)
})

$('.action').click(function(e){
    e.stopPropagation()
    openPopup(e)
})

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

$(window).click(function(){
    $('.popup').hide()
})

$('.popup').click(function(e){
    e.stopPropagation()
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
    else {
        try{
            if(agodaData.data[action][sub]){
                targetArray = agodaData.data[action][sub]
            }
        }
        catch(e){
            targetArray = null
        }
    }

    var data = {
        "action": action,
        "sub-action": sub,
        "data": targetArray,
        "randomisation": randomisation,
        "date": new Date().getTime()
    }

    console.log(data)
    // Put the JSON as a string in the hash
    window.location.hash = JSON.stringify(data);
})  
