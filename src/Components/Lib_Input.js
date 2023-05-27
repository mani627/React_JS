import React from 'react'



function Lib_Input({icon,...rest}) {
    const [width, setWindowWidth] = React.useState(0);


     // detect window screen size
  React.useEffect(() => {
   
    updateDimensions()

    window.addEventListener('resize', updateDimensions);
    return () =>
      window.removeEventListener('resize', updateDimensions);
  }, [])


  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }




  return (
    <div style={{position:"relative",display:"flex",flexDirection:"row",alignItems:"center"}}>
         {icon}
        <input  className='tracking-[.15em] ' style={width < 768?{height:"100%",borderColor:"transparent",margin:"3%",width:"77%",borderRadius:10,paddingLeft:'13%',boxSizing:"content-box",fontSize:"0.8rem"} :{height:"100%",borderColor:"transparent",margin:"2%",width:"46%",borderRadius:10,paddingLeft:'10%',boxSizing:"content-box"}} {...rest}
    />
   
    </div>
    
  )
}

export default Lib_Input