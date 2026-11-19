TURON CORNER - SETUP GUIDE
==========================

WHAT YOU NEED
- Visual Studio Code
- A web browser (Chrome, Edge, Firefox, etc.)
- Optional: Live Server extension in VS Code

STEP 1: OPEN THE PROJECT
1. Download and extract Turon-Corner.zip.
2. Open Visual Studio Code.
3. Select File > Open Folder.
4. Select the extracted Turon-Corner folder.

STEP 2: CHECK THE FILES
The folder should contain:
- index.html (customer website)
- admin.html (admin dashboard)
- style.css (website design)
- admin.css (dashboard design)
- script.js (cart and checkout functions)
- admin.js (dashboard functions)

STEP 3: RUN THE WEBSITE
Recommended method:
1. In VS Code, open Extensions (the four-square icon).
2. Search for "Live Server".
3. Install the Live Server extension.
4. Right-click index.html.
5. Select "Open with Live Server".
6. Your browser should open the Turon Corner website.

You can also double-click index.html to open it in a browser, but Live Server is recommended.

STEP 4: TEST THE CUSTOMER WEBSITE
1. Scroll to Our Menu.
2. Click "+ Add to cart" on any product.
3. Click Cart in the top-right corner.
4. Change quantities using + and -.
5. Click Continue to checkout.
6. Enter a name, contact number, and delivery address.
7. Click Place order.
8. A demo order confirmation will appear.

STEP 5: OPEN THE ADMIN DASHBOARD
1. Return to VS Code.
2. Open admin.html with Live Server (or visit /admin.html in the same Live Server site).
3. You should see the dashboard.
4. Your test order should appear in Customer orders.
5. Change its status using the dropdown.
6. Try deleting the test order.

IMPORTANT LIMITATIONS
- This is a front-end/static website project.
- Cart and order records use browser localStorage.
- The dashboard can see orders created in the same browser and same website origin.
- Orders are not shared between different devices or browsers.
- There is no real admin authentication.
- There is no online payment gateway.
- The checkout only records a demo order; it does not send an order to a shop.
- Product information is currently written in script.js. The admin product list is a display-only demo.
- Images and Google Fonts need an internet connection.

FOR A REAL BUSINESS
To accept real customer orders securely, you would later need a backend, database, protected admin login, and a payment/delivery process. Do not use this demo to collect sensitive customer information or real payments.


LATEST UPDATE
-------------
- Replaced unrelated stock food photos with photographs of Filipino turon / banana spring rolls.
- Added responsive layouts for desktop, tablet, and smartphone screens.
- On small screens, the header navigation moves to a second row, product cards resize, and the cart/checkout fit the phone screen.
- Product photos are illustrative examples of turon; specialty flavors are menu concepts and their exact fillings may not be visible in the reference photos.
- The photos are loaded from their original online image hosts, so an internet connection is needed to display them.
