import Footer from "@/components/footer";
import { Nav } from "@/components/nav";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" />
       <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Tangerine:wght@400;700&display=swap" rel="stylesheet"/>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      </head>
      <body style={ { margin: "0" } }>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
