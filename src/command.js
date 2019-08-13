import MochaJSDelegate from 'mocha-js-delegate'
import fetch from 'sketch-polyfill-fetch'
import prefsManager from 'sketch-module-user-preferences'

const sketch = require('sketch');
const { DataSupplier, UI, Settings } = sketch;
const os = require('os');
const path = require('path');
const util = require('util');
const fs = require('@skpm/fs');

const FillType = { Solid: 0, Gradient: 1, Pattern: 4, Noise: 5 }
const PatternFillType = { Tile: 0, Fill: 1, Stretch: 2, Fit: 3}

const defaultPreferences = {
	randomisation: true
}

const Messaging = {
	downloading: "🕑 Downloading...",
	complete: "✅ Complete!",
}

const Alert = {
	title: "🛠 Agoda Design Toolkit",
	imageUrlBroken: "Some image urls cannot be reached!",
	selectText: "Select any text layers.",
	selectLayerWithFill: "Select any layers with at least one fill style."
}

const IDENTITY = "com.agoda.sketchplugin.datagenerator"

const preferences = prefsManager.getUserPreferences(IDENTITY, defaultPreferences)

const FOLDER = path.join(os.tmpdir(), IDENTITY)

//===============================================================================================//
// Data supplier life cycle =====================================================================//
//===============================================================================================//
export function onStartup() {
	// DataSupplier.registerDataSupplier('public.image', 'Hotel Property Images', 'SupplyPropertyImage');
	// Text
	DataSupplier.registerDataSupplier('public.text', 'Hotel Names', 'SupplyHotelName')
	DataSupplier.registerDataSupplier('public.text', 'Address', 'SupplyAddress')
	DataSupplier.registerDataSupplier('public.text', 'Countries', 'SupplyCountry')
	DataSupplier.registerDataSupplier('public.text', 'Airport Names', 'SupplyAirport')
	DataSupplier.registerDataSupplier('public.text', 'Cities', 'SupplyCity')
	DataSupplier.registerDataSupplier('public.text', 'Weather', 'SupplyWeather')
	DataSupplier.registerDataSupplier('public.text', 'Timestamp', 'SupplyTimestamp')
	DataSupplier.registerDataSupplier('public.text', 'Person Names', 'SupplyName')
	
	DataSupplier.registerDataSupplier('public.text', 'Aircraft Types', 'SupplyAircraft')
	DataSupplier.registerDataSupplier('public.text', 'Airline Names', 'SupplyAirlineName')
	DataSupplier.registerDataSupplier('public.text', 'Airport Code', 'SupplyAirportCode')
	DataSupplier.registerDataSupplier('public.text', 'Dates (DDMMYYYY)', 'SupplyDate')
	DataSupplier.registerDataSupplier('public.text', 'Email', 'SupplyEmail')
	DataSupplier.registerDataSupplier('public.text', 'Flight Duration', 'SupplyFlightDuration')
	DataSupplier.registerDataSupplier('public.text', 'Flight Numbers', 'SupplyFlightNumber')
	DataSupplier.registerDataSupplier('public.text', 'Hotel Amenities', 'SupplyHotelAmenity')
	DataSupplier.registerDataSupplier('public.text', 'Hotel Description', 'SupplyHotelDescription')
	DataSupplier.registerDataSupplier('public.text', 'Hotel Room Types', 'SupplyHotelRoomType')
	DataSupplier.registerDataSupplier('public.text', 'Names & Initials', 'SupplyNameAndInitial')
	DataSupplier.registerDataSupplier('public.text', 'Usernames', 'SupplyUsername')
	DataSupplier.registerDataSupplier('public.text', '24-Hour Time', 'Supply24HourTime')
	// DataSupplier.registerDataSupplier('public.text', '', 'Supply')

	// Image
	DataSupplier.registerDataSupplier('public.image', 'Hotel Front Images', 'SupplyHeroImage')
	DataSupplier.registerDataSupplier('public.image', 'Hotel Room Images', 'SupplyRoomImage')
	DataSupplier.registerDataSupplier('public.image', 'Hotel Facility Images', 'SupplyFacilityImage')
	// DataSupplier.resisterDataSupplier('publuc.image', 'Hotel Room Imaage')
}

export function onShutdown() {
	// Deregister the plugin
	DataSupplier.deregisterDataSuppliers()
	try {
	if (fs.existsSync(FOLDER)) {
			fs.rmdirSync(FOLDER)
		}
	} catch (err) {
		console.error(err)
	}
}

export function onSupplyHotelName(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "property-name")
}

export function onSupplyAddress(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "address")
}

export function onSupplyCountry(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "country")
}

export function onSupplyAirport(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "airports")
}

export function onSupplyCity(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "cities")
}

export function onSupplyWeather(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "weather")
}

export function onSupplyTimestamp(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "timestamp")
}

export function onSupplyName(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "names")
}

export function onSupplyAircraft(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "aircraft-type")
}

export function onSupplyAirlineName(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "airline-name")
}

export function onSupplyAirportCode(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "airport-code")
}

export function onSupplyDate(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "dates")
}

export function onSupplyEmail(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "email")
}

export function onSupplyFlightDuration(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "flight-duration")
}

export function onSupplyFlightNumber(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "flight-number")
}

export function onSupplyHotelAmenity(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "hotel-amenities")
}

export function onSupplyHotelDescription(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "hotel-description")
}

export function onSupplyHotelRoomType(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "hotel-room-name")
}

export function onSupplyNameAndInitial(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "names-initials")
}

export function onSupplyUsername(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "username")
}

export function onSupply24HourTime(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyDataForItems(dataKey, items, "24hour-format")
}

export function onSupplyHeroImage(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyImageForItems(dataKey, items, "property")
}

export function onSupplyRoomImage(context) {
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyImageForItems(dataKey, items, "room")
}

export function onSupplyFacilityImage(context){
	let dataKey = context.data.key
	let items = util.toArray(context.data.items).map(sketch.fromNative)

	getAndSupplyImageForItems(dataKey, items, "facilities")
}

function getAndSupplyDataForItems(dataKey, items, dataAddress){
	// UI.message(Messaging.downloading)
	fetchData((data) => {
		items.forEach((_, index) => {
			let targetData
			if ("short" in data["data"][dataAddress] || "medium" in data["data"][dataAddress] || "long" in data["data"][dataAddress]){
				targetData = mergeArrays([
					data["data"][dataAddress]["long"],
					data["data"][dataAddress]["medium"],
					data["data"][dataAddress]["short"]
				])
			}
			else {
				targetData = data["data"][dataAddress]
			}
			// let targetDataIndex = Math.floor(Math.random() * targetData.length)
			let targetDataIndex = getRandom(0, targetData.length-1)
			let selected = targetData[targetDataIndex]

			DataSupplier.supplyDataAtIndex(dataKey, selected, index)
			// UI.message(Messaging.complete)
		})
	})
}

function getAndSupplyImageForItems(dataKey, items, dataAddress){
	UI.message(Messaging.downloading)
	fetchData((data) => {
		items.forEach((_, index) => {
			let targetData = data["data"]["images"][dataAddress]
			// let targetDataIndex = Math.floor(Math.random() * targetData.length)
			let targetDataIndex = getRandom(0, targetData.length-1)
			let selected = targetData[targetDataIndex]

			setImageFromURL(dataKey, index, selected)
		})
	})
}

function mergeArrays(arrays = []){
	let newArray = []
	for(var i = 0; i < arrays.length; i++){
		newArray = newArray.concat(arrays[i])
	}
	// log(newArray)
	return newArray
}

function setImageFromURL(dataKey, index, url){
	return getImageFromURL(url).then(imagePath => {
		if(!imagePath){
			return
		}

		DataSupplier.supplyDataAtIndex(dataKey, imagePath, index)
		UI.message(Messaging.complete)
	})
}

function getImageFromURL(url){
	return fetch(encodeURI(url))
		.then(res => res.blob())
		.then(saveTempFileFormImageData)
		.catch((err) => {
			console.error(err)
			log(err)
			return
		})
}

function saveTempFileFormImageData(imageData){
	const guid = NSProcessInfo.processInfo().globallyUniqueString()
	const imagePath = path.join(FOLDER, `${guid}.jpg`)
	try {
		fs.mkdirSync(FOLDER)
	} catch (err) {
		// probably because the folder already exists
		// TODO: check that it is really because it already exists
		// console.error(err)
		// log(err)
	}
	try {
		fs.writeFileSync(imagePath, imageData, 'NSData')
		return imagePath
	} catch (err) {
		console.error(err)
		log(err)
		return undefined
	}
}


//===============================================================================================//
// Open Panel Function ==========================================================================//
//===============================================================================================//
export function openPanel(context) {
	// var panelWidth = 340;
	var panelWidth = 430
    var panelHeight = 590;

	// Create an NSThread dictionary with a specific identifier
	var threadDictionary = NSThread.mainThread().threadDictionary();
	var identifier = IDENTITY;

	// If there's already a panel, prevent the plugin from running
	if (threadDictionary[identifier]) return;

	// Create the panel and set its appearance
	var panel = NSPanel.alloc().init();

	panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true);
	panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
	// panel.setBackgroundColor(NSColor.whiteColor());
	panel.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.1294117647, 0.1294117647, 0.1294117647, 1));  

	// Set the panel's title and title bar appearance
	// panel.title = "Agoda Content Generator";
	panel.titlebarAppearsTransparent = true;

	// Center and focus the panel
	panel.center();
	panel.makeKeyAndOrderFront(null);
	panel.setLevel(NSFloatingWindowLevel);

	// Make the plugin's code stick around (since it's a floating panel)
	COScript.currentCOScript().setShouldKeepAround_(true);

	// Hide the Minimize and Zoom button
	panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
	panel.standardWindowButton(NSWindowZoomButton).setHidden(true);

	// Create the blurred background 
	// var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight));
	// vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight));
	// vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow);

	// Create the WebView with a request to a Web page in Contents/Resources/
	var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44));
	var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("webView-230.html"));
	webView.mainFrame().loadRequest(request);
	// Prevent it from drawing a white background
	webView.setDrawsBackground(false); 

	// Access the Web page's JavaScript environment
	var windowObject = webView.windowScriptObject();

	// Create the delegate
	var delegate = new MochaJSDelegate({
		// Listen for URL changes
		"webView:didChangeLocationWithinPageForFrame:": (function(webView, webFrame) {
			// Extract the URL hash (without #) by executing JavaScript in the Web page
			var hash = windowObject.evaluateWebScript("window.location.hash.substring(1)");
			var data = JSON.parse(hash);
			//call action control
			actionControl(context, data)
		}), 
		"webView:didFinishLoadForFrame:": (function(webView, webFrame) {
			var selection = context.selection;
			if (selection.length == 1){
				var layer = selection[0]
				var layerClass = layer.class()
				if(layerClass == "MSTextLayer") {
					var text = layer.stringValue()
					windowObject.evaluateWebScript("updateWordCount('" + text + "')")
				}
				else {
					var text = "$$$NotTextLayer$$$"
					windowObject.evaluateWebScript("updateWordCount('" + text + "')")
				}
			}
			else {
				var text = "$$$NotTextLayer$$$"
				windowObject.evaluateWebScript("updateWordCount('" + text + "')")
			}
			var randomisation = preferences.randomisation
			if(randomisation) {
				windowObject.evaluateWebScript("updateRandomisationBox('true')")
			}
			else {
				windowObject.evaluateWebScript("updateRandomisationBox('false')")
			}
		})
	})
	
	// Set the delegate on the WebView
	webView.setFrameLoadDelegate_(delegate.getClassInstance());

	// Add blurred effect
	// panel.contentView().addSubview(vibrancy); 
	// Add web view
	panel.contentView().addSubview(webView);

	// After creating the panel, store a reference to it
	threadDictionary[identifier] = panel;

	var closeButton = panel.standardWindowButton(NSWindowCloseButton);
	// Assign a function to the Close button
	closeButton.setCOSJSTargetFunction(function(sender) { 
		panel.close();

		// Remove the reference to the panel
		threadDictionary.removeObjectForKey(identifier);

		// Stop the plugin
		COScript.currentCOScript().setShouldKeepAround_(false);
	});
}

//===============================================================================================//
// On Selection Change Function =================================================================//
//===============================================================================================//
export function onSelectionChange(context, option = 1) {
	var threadDictionary = NSThread.mainThread().threadDictionary();
	var identifier = IDENTITY;
	// Check if there's a panel opened or not
	if (threadDictionary[identifier]) {
		var panel = threadDictionary[identifier];

		// Access the panel from the reference and the WebView
		var webView = panel.contentView().subviews()[0];
		var windowObject = webView.windowScriptObject();

		// Get the current selection and update the CSS preview accordingly
		var selection;
		if(option == 2){
			selection = context.document.selectedLayers().layers()
		}
		else {
			selection = context.actionContext.document.selectedLayers().layers()
		}
		
		if (selection.length == 1){
			var layer = selection[0]
			var layerClass = layer.class()
			if(layerClass == "MSTextLayer") {
				var text = layer.stringValue()
				windowObject.evaluateWebScript("updateWordCount('" + text + "')")
			}
			else {
				var text = "$$$NotTextLayer$$$"
				windowObject.evaluateWebScript("updateWordCount('" + text + "')")
			}
		}
		else {
			var text = "$$$NotTextLayer$$$"
			windowObject.evaluateWebScript("updateWordCount('" + text + "')")
		}
	}
}

//===============================================================================================//
// Command Receivers ============================================================================//
//===============================================================================================//

//Address
export function commandTextAddressShort(context){
	commandHandler(context, "address", "short")
}
export function commandTextAddressMedium(context){
	commandHandler(context, "address", "medium")
}
export function commandTextAddressLong(context){
	commandHandler(context, "address", "long")
}

//Airport
export function commandTextAirportShort(context){
	commandHandler(context, "airports", "short")
}
export function commandTextAirportMedium(context){
	commandHandler(context, "airports", "medium")
}
export function commandTextAirportLong(context){
	commandHandler(context, "airports", "long")
}

//City
export function commandTextCityShort(context){
	commandHandler(context, "cities", "short")
}
export function commandTextCityMedium(context){
	commandHandler(context, "cities", "medium")
}
export function commandTextCityLong(context){
	commandHandler(context, "cities", "long")
}

//Country
export function commandTextCountryShort(context){
	commandHandler(context, "country", "short")
}
export function commandTextCountryMedium(context){
	commandHandler(context, "country", "medium")
}
export function commandTextCountryLong(context){
	commandHandler(context, "country", "long")
}

// Property
export function commandTextPropertyShort(context){
	commandHandler(context, "property-name", "short")
}
export function commandTextPropertyMedium(context){
	commandHandler(context, "property-name", "medium")
}
export function commandTextPropertyLong(context){
	commandHandler(context, "property-name", "long")
}

// Weather
export function commandTextWeatherShort(context){
	commandHandler(context, "weather", "short")
}
export function commandTextWeatherMedium(context){
	commandHandler(context, "weather", "medium")
}
export function commandTextWeatherLong(context){
	commandHandler(context, "weather", "long")
}

//Currency
export function commandTextCurrencyShort(context){
	commandHandler(context, "currency", "short")
}
export function commandTextCurrencyMedium(context){
	commandHandler(context, "currency", "medium")
}
export function commandTextCurrencyLong(context){
	commandHandler(context, "currency", "long")
}

//Timestamp
export function commandTextTimestampShort(context){
	commandHandler(context, "timestamp", "short")
}
export function commandTextTimestampMedium(context){
	commandHandler(context, "timestamp", "medium")
}
export function commandTextTimestampLong(context){
	commandHandler(context, "timestamp", "long")
}

//Name
export function commandTextNameShort(context){
	commandHandler(context, "names", "short")
}
export function commandTextNameMedium(context){
	commandHandler(context, "names", "medium")
}
export function commandTextNameLong(context){
	commandHandler(context, "names", "long")
}

//Property - Image
export function commandImagePropertyHero(context){
	commandHandler(context, "images", "property")
}
export function commandImagePropertyRoom(context){
	commandHandler(context, "images", "room")
}
export function commandImagePropertyFacilities(context){
	commandHandler(context, "images", "facilities")
}


//===============================================================================================//
// Core Functions ===============================================================================//
//===============================================================================================//
function commandHandler(context, action, subAction) {
	fetchData(function(data){
		var targetArray
        try{
            if(data.data[action][subAction]){
                targetArray = data.data[action][subAction]
            }
        }
        catch(e){
            targetArray = null
		}
		var randomisation = preferences.randomisation
		var data = {
			"action": action,
			"sub-action": subAction,
			"data": targetArray,
			"randomisation": randomisation,
			"date": new Date().getTime()
		}

		actionControl(context, data)
	})

}

function fetchData(callback) {
	fetch("https://github.agodadev.io/pages/pwanpen/Agoda-data/data.json")
	.then(response => response.json())
	.then(function(data){
		if (typeof callback === "function") {
			callback(data)
		}
		else {
			return false
		}
	})
	.catch(e => log(e))
}

function fetchImage(url,ingnoreCache) {
    var request = ingnoreCache ? NSURLRequest.requestWithURL_cachePolicy_timeoutInterval(NSURL.URLWithString(url), NSURLRequestReloadIgnoringLocalCacheData, 60) : NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var responsePtr = MOPointer.alloc().init();
    var errorPtr = MOPointer.alloc().init();

    var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr);
    if(errorPtr.value() != null) {
        print(errorPtr.value());
        return null;
    }

    var response = responsePtr.value();
    if(response.statusCode() != 200) {
        return null;
    }

    var mimeType = response.allHeaderFields()["Content-Type"];
    if(!mimeType || !mimeType.hasPrefix("image/")) {
        return null;
    }

    return NSImage.alloc().initWithData(data);
}

function actionControl(context, action) {
	log(action)
	switch (action.action) {
		case "currency":
			textCurrency(context, action)
			break;

		case "images":
			fillImage(context, action)
			break;

		case "setRamdomisationPref":
			setRamdomisationPref(action)
			break;

		case "translate":
			translateRegular(context, action)
			break;

		case "crossout":
			generateCrossoutRate(context,action)
	
		default:
			textFromData(context, action)
			break;
	}
}

function fillImage(context, action){
	var layerData = getLayerWithFillStyle(context)
	var targetArray = action.data.slice(0)
	var randomisation = action.randomisation
	var ranNum = getRandom(0, targetArray.length-1)
	var errorImage = 0
	if(layerData){
		UI.message(Messaging.downloading)
		setTimeout(() => {
			for(var i = 0; i < layerData.layers.length; i++){
				var layer = layerData.layers[i]
				var layerClass = layer.class()
				if (randomisation) { ranNum = getRandom(0, targetArray.length-1) }
				var url = encodeURI(targetArray[ranNum])
				var image = fetchImage(url)
				if (randomisation) { targetArray.splice(ranNum, 1) }
				if(targetArray.length == 0){
					targetArray = action.data.slice(0)
				}
				// log("image-url: "+url)
				if(image) {
					switch (layerClass) {
						default:
							var fill = layer.style().firstEnabledFill()
							fill.fillType = FillType.Pattern;
							fill.patternFillType = PatternFillType.Fill;
							fill.image = MSImageData.alloc().initWithImage(image);
							break;
						// default:
						// 	log('This layer is not in any categories')
						// 	break;
						case MSSymbolInstance:
							var masterKey = layer.symbolMaster()
							var overridePoint = layerData.symbols[masterKey]
							var imageData = MSImageData.alloc().initWithImage(image);
							layer.setValue_forOverridePoint_(imageData, overridePoint)
							break;
					}
				} else {
					errorImage++
				}
			}
			if (errorImage > 0) {
				UI.alert(Alert.title, Alert.imageUrlBroken)
			}
			UI.message(Messaging.complete)
		}, 500);
	}
}

function textFromData(context, action){
	var layerData = getSelectedTextLayer(context)
	var targetArray = action.data.slice(0)
	var randomisation = action.randomisation
	var ranNum = getRandom(0, targetArray.length-1)
	// log(targetArray)
	if(layerData){
		for(var i = 0; i < layerData.layers.length; i++){
			var layer = layerData.layers[i]
			if (randomisation) { ranNum = getRandom(0, targetArray.length-1) }
			var text = decodeURIComponent(targetArray[ranNum])
			var layerClass = layer.class();
			switch (layerClass) {
				case MSTextLayer:
					layer.stringValue = text
					// layer.name = text
					break;
				case MSSymbolInstance:
					var masterKey = layer.symbolMaster()
					var overridePoint = layerData.symbols[masterKey]
					layer.setValue_forOverridePoint_(text, overridePoint)
					break;
				default:
					log('This layer is not in any categories')
					break;
			}
			if (randomisation) { targetArray.splice(ranNum, 1) }
			if(targetArray.length == 0){
				targetArray = action.data.slice(0)
			}
			onSelectionChange(context, 2)
		}
	}
}

function textCurrency(context, action){
	log(context)
	var layerData = getSelectedTextLayer(context)
	var randomisation = action.randomisation
	var getCurrency
	switch(action['sub-action']){
		case "short":
			getCurrency = function(){
				var number = getRandom(1, 9999).toLocaleString('en')
				var text = "$" + number
				return text
			}
			break;

		case "medium":
			getCurrency = function(){
				var number = getRandom(999, 999999).toLocaleString('en')
				var text = "SGD" + number
				return text
			}
			break;

		case "long":
			getCurrency = function(){
				var number = getRandom(999999, 99999999).toLocaleString('en')
				var text = "VND" + number
				return text
			}
			break;
	}
	if(layerData){
		var text = getCurrency()
		for(var i = 0; i < layerData.layers.length; i++){
			var layer = layerData.layers[i]
			if (randomisation) { text = getCurrency() }
			var layerClass = layer.class();
			switch (layerClass) {
				case MSTextLayer:
					layer.stringValue = text
					// layer.name = text
					break;
				case MSSymbolInstance:
					var masterKey = layer.symbolMaster()
					var overridePoint = layerData.symbols[masterKey]
					layer.setValue_forOverridePoint_(text, overridePoint)
					break;
				default:
					log('This layer is not in any categories')
					break;
			}
			onSelectionChange(context, 2)
		}
	}
}

function getSelectedTextLayer(context){
	var selectedLayers = context.document.selectedLayers().layers()
	var selectedCount = selectedLayers.count()
	// var selectedTextLayers = [];
	var selectedTextLayers = {
		layers: [],
		symbols: {},
		groups: []
	};
	for(var i = 0; i < selectedCount; i++){
		var layer = selectedLayers[i]
		var layerClass = layer.class();
		switch (layerClass) {
			case MSTextLayer:
				selectedTextLayers.layers.push(layer)
				break;

			default:
				log('This layer is not in any categories')
				break;

			case MSSymbolInstance:
				selectedTextLayers.layers.push(layer)
				var masterKey = layer.symbolMaster()
				if(!selectedTextLayers.symbols.hasOwnProperty(masterKey)) {
					var targetPoint = getOverridePoint(layer, "stringValue")
					selectedTextLayers.symbols[masterKey] = targetPoint
				}
				break;
		}
		// if (layerClass == "MSTextLayer") selectedTextLayers.push(layer)
	}
	var layerCount = countSelectedLayers(selectedTextLayers)
	if (layerCount == 0) {
		UI.alert(Alert.title, Alert.selectText)
		return false
	}
	else {
		return selectedTextLayers
	}
}

function getLayerWithFillStyle(context) {
	var layers = context.document.selectedLayers().layers()
	var count = layers.count()
	var selectedTextLayers = {
		layers: [],
		symbols: {},
		groups: []
	};
	for(var i = 0; i < count; i++){
		var layer = layers[i]
		var layerClass = layer.class()
		switch (layerClass) {

			default:
				if(layer && layer.style().firstEnabledFill()){
					selectedTextLayers.layers.push(layer)
				}
				break;
		
			// default:
			// 	log('This layer is not in any categories')
			// 	break;
				
			case MSSymbolInstance:
				selectedTextLayers.layers.push(layer)
				var masterKey = layer.symbolMaster()
				if(!selectedTextLayers.symbols.hasOwnProperty(masterKey)) {
					var targetPoint = getOverridePoint(layer, "image")
					selectedTextLayers.symbols[masterKey] = targetPoint
				}
				break;
		}
	}
	var layerCount = countSelectedLayers(selectedTextLayers)
	if (layerCount == 0) {
		UI.alert(Alert.title, Alert.selectLayerWithFill)
		return false
	}
	else {
		return selectedTextLayers
	}
}

function countSelectedLayers(data) {
	var layers = data.layers.length
	var groups = data.groups.length
	var symbols = Object.keys(data.symbols).length
	return layers + groups + symbols
}

function getOverridePoint(layer, type){
	var overrideData = {
		overridePoints: [],
		overrideTitles: [],
		layer: layer
	}
	layer.overridePoints().forEach(function(overridePoint){
		if(overridePoint.property() == type) {
			log(overridePoint.layerName())
			overrideData.overridePoints.push(overridePoint)
			overrideData.overrideTitles.push(overridePoint.layerName())
		}
	})
	overrideData.overrideTitles = renameArray(overrideData.overrideTitles)
	var selection = {
		overridePoint: null,
		overrideTitle: null
	}
	if(overrideData.overridePoints.length == 1) {
		selection.overridePoint = overrideData.overridePoints[0]
	}
	else {
		selection = modalSelectLayer(overrideData)
	}
	return selection.overridePoint
}

function renameArray(arr){
	var count = {};
	arr.forEach(function(x,i) {

		if ( arr.indexOf(x) !== i ) {
		var c = x in count ? count[x] = count[x] + 1 : count[x] = 1;
		var j = c + 1;
		var k = x + '(' + j + ')';

		while( arr.indexOf(k) !== -1 ) k = x + '(' + (++j) + ')';
		arr[i] = k;
		}
	});
	return arr;
}

function modalSelectLayer(overrideData){
	var modal = COSAlertWindow.new()
	var masterName = overrideData.layer.symbolMaster().name()
	modal.setMessageText("Select target layer in symbol named: "+ masterName)
	modal.addButtonWithTitle("Ok")
	modal.addButtonWithTitle("Cancel")
	var viewWidth = 300;
	var viewHeight = 100;
	var dropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 130, 22))
	overrideData.overrideTitles.forEach(function(title){
		dropdown.addItemWithTitle_(title)
	})

	modal.addAccessoryView(dropdown)
	var response = modal.runModal()
	var selection = {
		overridePoint: null,
		overrideTitle: null
	}
	if(response == "1000") {
		var index = dropdown.indexOfSelectedItem()
		selection.overridePoint = overrideData.overridePoints[index]
		// selection.overrideTitle = overrideData.overrideTitles[index]
	}
	return selection
}

function getRandom(min, max) {
	// return Math.round( Math.random() * (max - min) + min )
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// !Deprecated
// function sendAlert(message){
// 	var alert = COSAlertWindow.new()
// 	alert.setMessageText(message)
// 	alert.addButtonWithTitle("Ok")
// 	alert.runModal()
// }

// !Deprecated
// function sendMessage(context, message) {
// 	var doc = context.document
// 	doc.showMessage(message)
// }

function setRamdomisationPref(action){
	var randomisation = action.randomisation
	prefsManager.setUserPreferences(IDENTITY, {
		randomisation: randomisation
	})
}

//--------------------------
// Translation API
//--------------------------

function yandexTranslate(layer, targetLang, callback){
	var lang = targetLang
	var text = layer.stringValue()
	var keyUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180724T104428Z.25a7e0c10662522d.de42fcb23f4704fef576f4cb3e9fcd0ce8bfed12"
	var langPara = "&lang=" + lang
	var textPara = "&text=" + text
	var encodeUrl = encodeURI(keyUrl + langPara + textPara)
	fetch(encodeUrl)
	.then(response => response.json())
	.then(function(data){
		callback(data, layer)
	})
	.catch(e => log(e))
}

function googleTranslate(layer, targetLang, callback){
	var lang = targetLang
	var text = layer.stringValue()
	var keyUrl = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCAFZ1a5t1jobpcxV6gmqOrIJ4evftdqXU"
	var langPara = "&target=" + lang
	var textPara = "&q=" + text
	var encodeUrl = encodeURI(keyUrl + langPara + textPara)
	fetch(encodeUrl)
	.then(response => response.json())
	.then(function(data){
		callback(data, layer)
	})
	.catch(e => log(e))
}

function translateRegular(context, data) {
	var layerData = getSelectedTextLayer(context)
	if(layerData){
		for(var i = 0; i < layerData.layers.length; i++){
			var layer = layerData.layers[i]
			var layerClass = layer.class();
			
			switch (layerClass) {
				case MSTextLayer:
					// var targetLang
					var targetLang = data.data
					googleTranslate(layer, targetLang, function(response, element){
						// if (response.code == 200) {
						// 	var text = response.text[0]
						// 	element.stringValue = text
						// }
						if(response.hasOwnProperty("data")){
							var text = response.data.translations[0].translatedText
							element.stringValue = text
						}
					})
					break;
				case MSSymbolInstance:
					
					break;
				default:
					log('This layer is not in any categories')
					break;
			}
			onSelectionChange(context, 2)
		}
	}
}

function generateCrossoutRate(context,action) {
	var sketch = require('sketch')
	var Text = require('sketch/dom').Text
	var document = sketch.getSelectedDocument()
	var selectedLayers = document.selectedLayers
	var selectedCount = selectedLayers.length

	if(selectedCount == 1){

		var originalInput = action.data.original
		var discountInput = action.data.discount

		var original = selectedLayers.layers[0]
		var newText = new Text({
		  text: 'New rate',
		  style: original.style,
		  parent: original.parent
		})

		var saveOriginX = original.frame.x
		var saveOriginY = original.frame.y
		var saveOriginHeight = original.frame.height
		var newYOffset = saveOriginY+saveOriginHeight+12

		newText.frame.offset(saveOriginX, newYOffset)

		var discount = originalInput*(discountInput/100)
		var newRate = Math.round(originalInput-discount)
		original.text = parseInt(originalInput).toLocaleString('en')
		newText.text = parseInt(newRate).toLocaleString('en')

		log(originalInput.toLocaleString('en'))

		// original.style.textStrikethrough = 'single'
		var saveOriginWidth = original.frame.width

		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(saveOriginX+saveOriginWidth, saveOriginY+8));
		path.lineToPoint(NSMakePoint(saveOriginX, (saveOriginY+saveOriginHeight)-8));

		var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
		var border = shape.style().addStylePartOfType(1);
		border.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});6
		border.thickness = 2;
		context.document.currentPage().currentArtboard().addLayers([shape])

		

	}
	else {
		sendAlert('Select a text layer')
	}
}



// *experimental text generator
// var Text = require('sketch/dom').Text;
// console.log('This is an example Sketch script.')

// var sketch = require('sketch')

// var document = sketch.getSelectedDocument()

// var selectedLayers = document.selectedLayers
// var selectedCount = selectedLayers.length

// // var text = new Text({
// //   text: "hello",
// //   parent: document.pages[0].layers[0]
// // })
// // console.log(selectedLayers.layers[0].style)

// var saveStyle = selectedLayers.layers[0].style
// var newText = new Text({
//   text: 'New rate',
//   style: saveStyle,
//   parent: selectedLayers.layers[0].parent
// })
// selectedLayers.layers[0].style.textStrikethrough = 'single'
// var saveFrameY = selectedLayers.layers[0].frame.y
// var saveFrameX = selectedLayers.layers[0].frame.x
// var saveFrameHeight = selectedLayers.layers[0].frame.height
// var newOffset = saveFrameY+saveFrameHeight+12

// newText.frame.offset(saveFrameX, newOffset)
// console.log(selectedLayers.layers[0].text)

// *experimental line and path generator
// var path = NSBezierPath.bezierPath();
// path.moveToPoint(NSMakePoint(saveFrameX+saveFrameWidth, saveFrameY+8));
// path.lineToPoint(NSMakePoint(saveFrameX, (saveFrameY+saveFrameHeight)-8));

// var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
// var border = shape.style().addStylePartOfType(1);
// border.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});6
// border.thickness = 2;

// // selectedLayers.layers[0].parent.addLayers([shape]);
// // console.log(selectedLayers.layers[0].parent)
// context.document.currentPage().currentArtboard().addLayers([shape])

// log(context.document)