/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      borderColor:{
        'custom-color':'rgb(195,199,205)'
      },
      backgroundColor: {
        'back-color': 'rgb(170,210,184)', 
        'button-color':'rgb(148,195,156)',
      },
      colors:{
        'firstcolor':"rgb(97,158,124)",
        
          'custom-navy': '#03045E',
       
      },
      backgroundImage: {
        "custom-gradient":
         "linear-gradient(to left bottom, #7277ff, #938fff, #afa8ff, #c9c2ff, #e1dcff, #e1dcff, #e1dcff, #e1dcff, #c9c2ff, #afa8ff, #938fff, #7277ff);",
      },
      
    
    },
  },
  plugins: [],
}