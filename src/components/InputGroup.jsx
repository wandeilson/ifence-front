

const InputGroup = (props) => {
    return (
        <div class="input-group flex-nowrap">
            {props.children}
            <span class="input-group-text" id="addon-wrapping">{props.label}</span>
        </div>
    );
}

export {InputGroup};
export default InputGroup;
