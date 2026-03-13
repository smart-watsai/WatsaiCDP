// ==========================================
// 1. ฟังก์ชันสร้างฐานข้อมูลหลักและชีตย่อย 
// ==========================================
function setupCDPDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var layersConfig = [
    {id: "1", cat: "ศูนย์ข้อมูลแผนที่", name: "ขอบเขตตำบล", sheet: "Map_Boundary", type: "GeoJSON", icon: "fas fa-draw-polygon"},
    {id: "2", cat: "ศูนย์ข้อมูลแผนที่", name: "หมู่บ้าน", sheet: "Map_Village", type: "Point", icon: "fas fa-home"},
    {id: "3", cat: "ศูนย์ข้อมูลแผนที่", name: "ถนน", sheet: "Map_Road", type: "GeoJSON", icon: "fas fa-road"},
    {id: "4", cat: "ศูนย์ข้อมูลแผนที่", name: "คลอง", sheet: "Map_Canal", type: "GeoJSON", icon: "fas fa-water"},
    {id: "5", cat: "ศูนย์ข้อมูลแผนที่", name: "แหล่งน้ำ", sheet: "Map_Water", type: "GeoJSON", icon: "fas fa-tint"},

    {id: "6", cat: "โครงสร้างพื้นฐาน", name: "CCTV", sheet: "Infra_CCTV", type: "Point", icon: "fas fa-video"},
    {id: "7", cat: "โครงสร้างพื้นฐาน", name: "ไฟฟ้า", sheet: "Infra_Electric", type: "Point", icon: "fas fa-lightbulb"},
    {id: "8", cat: "โครงสร้างพื้นฐาน", name: "ถังขยะ", sheet: "Infra_Trash", type: "Point", icon: "fas fa-trash-alt"},
    {id: "9", cat: "โครงสร้างพื้นฐาน", name: "ถังดับเพลิง", sheet: "Infra_Fire", type: "Point", icon: "fas fa-fire-extinguisher"},

    {id: "10", cat: "ข้อมูลประชาชน", name: "ประชากร", sheet: "Pop_General", type: "Point", icon: "fas fa-users"},
    {id: "11", cat: "ข้อมูลประชาชน", name: "ผู้สูงอายุ", sheet: "Pop_Elderly", type: "Point", icon: "fas fa-user-clock"},
    {id: "12", cat: "ข้อมูลประชาชน", name: "ผู้พิการ", sheet: "Pop_Disabled", type: "Point", icon: "fas fa-wheelchair"},
    {id: "13", cat: "ข้อมูลประชาชน", name: "ผู้ป่วยติดเตียง", sheet: "Pop_Bedridden", type: "Point", icon: "fas fa-procedures"},
    {id: "14", cat: "ข้อมูลประชาชน", name: "ผู้ยากไร้", sheet: "Pop_Poor", type: "Point", icon: "fas fa-hand-holding-heart"},

    {id: "15", cat: "ข้อมูลสุขภาพ", name: "ADL", sheet: "Health_ADL", type: "Point_Condition", icon: "fas fa-clipboard-list"},
    {id: "16", cat: "ข้อมูลสุขภาพ", name: "ผู้ป่วยเรื้อรัง", sheet: "Health_Chronic", type: "Point", icon: "fas fa-pills"},
    {id: "17", cat: "ข้อมูลสุขภาพ", name: "กลุ่มเสี่ยง", sheet: "Health_Risk", type: "Point", icon: "fas fa-exclamation-triangle"}
  ];

  var settingsSheet = ss.getSheetByName("Settings");
  if (!settingsSheet) { settingsSheet = ss.insertSheet("Settings"); }
  settingsSheet.clear();
  settingsSheet.appendRow(["LayerID", "Category", "LayerName", "SheetName", "Type", "Icon", "Status"]);
  
  layersConfig.forEach(function(layer) {
    settingsSheet.appendRow([layer.id, layer.cat, layer.name, layer.sheet, layer.type, layer.icon, "Active"]);
    
    var dataSheet = ss.getSheetByName(layer.sheet);
    if (!dataSheet) {
      dataSheet = ss.insertSheet(layer.sheet);
      if (layer.cat === "ข้อมูลประชาชน" || layer.cat === "ข้อมูลสุขภาพ") {
        if (layer.type === "Point_Condition") {
          dataSheet.appendRow(["ID", "Name", "Latitude", "Longitude", "ADL_Score", "Age", "Address", "Disease", "Disability_Type", "Caregiver", "Phone", "Detail"]);
        } else {
          dataSheet.appendRow(["ID", "Name", "Latitude", "Longitude", "Age", "Address", "Disease", "Disability_Type", "Caregiver", "Phone", "Detail"]);
        }
      } 
      else if (layer.sheet === "Infra_CCTV") {
        dataSheet.appendRow(["ID", "Name", "Latitude", "Longitude", "Camera_Count", "Video_URL", "Install_Date", "Status", "Detail"]);
      } 
      else if (layer.cat === "โครงสร้างพื้นฐาน") {
        dataSheet.appendRow(["ID", "Name", "Latitude", "Longitude", "Type", "Install_Date", "Status", "Detail"]);
      }
      else if (layer.type === "GeoJSON") {
        dataSheet.appendRow(["ID", "Name", "GeoJSON", "Color", "Detail"]);
      } 
      else {
        dataSheet.appendRow(["ID", "Name", "Latitude", "Longitude", "Detail"]);
      }
      dataSheet.getRange("A1:L1").setFontWeight("bold").setBackground("#f3f3f3");
    }
  });
  settingsSheet.getRange("A1:G1").setFontWeight("bold").setBackground("#d9ead3");

  var popSheet = ss.getSheetByName("Data_Population");
  if (!popSheet) {
    popSheet = ss.insertSheet("Data_Population");
    popSheet.appendRow(["Moo", "Village_Name", "Pop_Male", "Pop_Female", "Pop_Total"]);
    popSheet.getRange("A1:E1").setFontWeight("bold").setBackground("#d9d2e9");
  }
}

// ==========================================
// 2. API สำหรับ Web App
// ==========================================
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setTitle('ระบบข้อมูลเมือง อบต.วัดไทรย์')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

function include(filename) { 
  return HtmlService.createHtmlOutputFromFile(filename).getContent(); 
}

function getSystemSettings() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  if (!sheet) return [];
  var data = sheet.getDataRange().getDisplayValues(); 
  var headers = data.shift(); 
  return data.map(function(row) { 
    var obj = {}; headers.forEach(function(h, i) { obj[h] = row[i]; }); return obj; 
  }).filter(function(item) { return item.Status === "Active"; });
}

function getLayerData(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return []; 
  var data = sheet.getDataRange().getDisplayValues(); 
  var headers = data.shift();
  return data.map(function(row) { 
    var obj = {}; headers.forEach(function(h, i) { if(h !== "") { obj[h] = row[i]; } }); return obj; 
  });
}

// ==========================================
// 3. API สำหรับบันทึกข้อมูลใหม่จากหน้าเว็บ
// ==========================================
function saveNewData(payload) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(payload.SheetName);
    
    if (!sheet) {
      return { success: false, message: "ไม่พบฐานข้อมูลที่เลือกระบบ" };
    }
    
    // ดึงหัวตารางเพื่อสร้างแถวใหม่ให้ตรงคอลัมน์
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newRow = new Array(headers.length).fill("");
    
    // 1. สร้าง ID อัตโนมัติ (Timestamp)
    var idIndex = headers.indexOf("ID");
    if (idIndex > -1) { newRow[idIndex] = "ID_" + new Date().getTime(); }
    
    // 2. แมปข้อมูลจากฟอร์มเข้าสู่คอลัมน์ที่ตรงกัน
    for (var key in payload) {
      var colIndex = headers.indexOf(key);
      if (colIndex > -1) {
        newRow[colIndex] = payload[key];
      }
    }
    
    // 3. นำข้อมูลต่อท้ายใน Sheet
    sheet.appendRow(newRow);
    
    return { success: true, message: "บันทึกข้อมูล " + payload.Name + " ลงฐานข้อมูลสำเร็จ!" };
    
  } catch (error) {
    return { success: false, message: "เกิดข้อผิดพลาด: " + error.toString() };
  }
}
