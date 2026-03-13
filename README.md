# WatsaiCDP
# 🏙️ Watsai Smart City Data Platform
**ระบบศูนย์กลางข้อมูลดิจิทัลเมืองอัจฉริยะ องค์การบริหารส่วนตำบลวัดไทรย์**

![Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Google_Apps_Script-blue)
![Database](https://img.shields.io/badge/Database-Google_Sheets-10b981)
![License](https://img.shields.io/badge/License-MIT-gray)

**Watsai Smart City Data Platform** คือระบบสารสนเทศภูมิศาสตร์ (GIS) และศูนย์บัญชาการข้อมูล (Data Dashboard) ที่พัฒนาขึ้นเพื่อยกระดับการบริหารจัดการขององค์กรปกครองส่วนท้องถิ่น (อปท.) โดยบูรณาการข้อมูลโครงสร้างพื้นฐาน ข้อมูลประชากร และข้อมูลสาธารณสุข ให้อยู่ในรูปแบบที่วิเคราะห์และใช้งานได้จริงแบบ Real-time บนเบราว์เซอร์

---

## ✨ ฟีเจอร์เด่น (Key Features)

### 🗺️ 1. Interactive GIS Mapping
* **Multi-Layer Map:** รองรับการแสดงผลแผนที่ถนน, ดาวเทียม และเรดาร์ความมืด พร้อมระบบสลับเลเยอร์ข้อมูลแบบอิสระ
* **3D Building Mode:** โหมดแสดงผลอาคารแบบ 3 มิติ เพื่อการดูบริบทเมืองเชิงลึก
* **Dynamic Smart Popup:** ระบบดึงข้อมูลจาก Database มาสร้างตารางแสดงผลใน Popup อัตโนมัติ พร้อมระบบสี (Badge) และปุ่มโทรออกด่วน (Direct Call) สำหรับติดต่อฉุกเฉิน

### 📊 2. Real-time Analytics Dashboard (Glassmorphism UI)
* **Tabbed Dashboard:** สรุปสถิติภาพรวมเมือง, โครงสร้างประชากร (กราฟแท่ง), สัดส่วนผู้ป่วยภาวะพึ่งพิง ADL (กราฟโดนัท) และโครงสร้างพื้นฐาน
* **One-Click PDF Export:** ระบบจัดหน้าเอกสารอัตโนมัติสำหรับการสั่งพิมพ์รายงาน (Print) เพื่อนำเข้าสู่ที่ประชุมสภาฯ หรือผู้บริหาร

### 🛡️ 3. PDPA & Data Security (ระบบรักษาความปลอดภัยข้อมูล)
* **PIN Access Control:** ระบบล็อกรหัสผ่าน (PIN Code) 4 หลัก เพื่อจำกัดสิทธิ์การเข้าถึงข้อมูลส่วนบุคคลที่อ่อนไหว (Sensitive Data) เช่น ข้อมูลผู้ป่วยติดเตียงและผู้พิการ ให้เข้าถึงได้เฉพาะเจ้าหน้าที่ที่ได้รับอนุญาตเท่านั้น

### 📍 4. Web Data Entry (ระบบรับข้อมูลผ่านหน้าเว็บ)
* **Map-Click Input:** เจ้าหน้าที่สามารถจิ้มจุดบนแผนที่ และกรอกฟอร์มเพื่อเพิ่มข้อมูลพิกัดใหม่ลงฐานข้อมูล (Google Sheets) ได้แบบ Real-time โดยไม่ต้องเปิดไฟล์เอกสารต้นฉบับ

### 🎯 5. Spatial Analysis & Live Weather
* **500m Buffer Zone:** เครื่องมือสร้างรัศมีวิเคราะห์ 500 เมตร เพื่อประเมินพื้นที่เสี่ยงหรือพื้นที่คุ้มครอง (เช่น รัศมีถังดับเพลิง หรือผู้ป่วยในพื้นที่น้ำท่วม)
* **Heatmap Visualization:** แผนที่ความร้อนเพื่อดูความหนาแน่นของข้อมูล
* **Live Rain Radar & AQI:** เชื่อมต่อ API สภาพอากาศเพื่อดูการเคลื่อนตัวของกลุ่มฝน อุณหภูมิ และค่าฝุ่น PM 2.5 ในพื้นที่แบบสดๆ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

**Frontend:**
* HTML5, CSS3 (Glassmorphism & Soft UI design)
* Vanilla JavaScript (ES5/ES6)
* [Leaflet.js](https://leafletjs.com/) (Map Engine) & [OSMBuildings](https://osmbuildings.org/) (3D Map)
* [Chart.js](https://www.chartjs.org/) (Data Visualization)

**Backend & Database:**
* **Google Apps Script (GAS):** ทำหน้าที่เป็น Serverless API
* **Google Sheets:** ทำหน้าที่เป็นฐานข้อมูล (NoSQL-like Database) สำหรับเก็บพิกัดและข้อมูลส่วนบุคคล

**Third-Party APIs:**
* RainViewer API (เรดาร์กลุ่มฝน)
* Open-Meteo API (สภาพอากาศและคุณภาพอากาศ)

---

## 🚀 วิธีการติดตั้งและใช้งาน (Setup Guide)

1. คัดลอกโค้ดทั้งหมด ( `Code.gs`, `Index.html`, `CSS.html`) นำไปวางในโปรเจกต์ Google Apps Script ใหม่
2. รันฟังก์ชัน `setupCDPDatabase()` ในไฟล์ `Code.gs` เพื่อให้ระบบสร้างโครงสร้างตาราง Google Sheets อัตโนมัติ
3. ตั้งค่าการแชร์ (Deploy) เป็น **Web App** * Execute as: `Me`
   * Who has access: `Anyone`
4. *ข้อควรระวัง:* แก้ไข `SECRET_PIN` ในไฟล์ `Index.html` ให้เป็นรหัสผ่านสำหรับเจ้าหน้าที่ของคุณก่อนนำไปใช้งานจริง

---

## ⚠️ คำชี้แจงด้านความเป็นส่วนตัว (Privacy Disclaimer)
ข้อมูลทั้งหมดที่ปรากฏใน Repository นี้ รวมถึงภาพตัวอย่าง เป็นเพียง **ข้อมูลจำลอง (Mock Data)** ที่สร้างขึ้นเพื่อการทดสอบระบบเท่านั้น ไม่มีข้อมูลส่วนบุคคล ข้อมูลสุขภาพ หรือข้อมูลพิกัดบ้านพักอาศัยของประชาชนจริงถูกบันทึกหรือเผยแพร่ใน Source Code นี้ เพื่อให้สอดคล้องกับ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)

---

👨‍💻 **Developed by:** Phuwa (Bank)
