


const Container = (props)=>{
    
    return (
        <div className={`container container-fluid ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}

export {Container};

export default Container;
