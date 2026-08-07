export default function DefaultButton({children,
                                       fontSize = 12,
                                       className = "",
                                       onClickAction,
                                       submit = false,
                                       disabled = false}) {
    return (
        <div className={`white-button-wrap ${className}`}>
            <button
                type={submit ? "submit" : "button"}
                onClick={onClickAction}
                className="white-button disabled:opacity-35"
                style={{ fontSize: `${fontSize}px`}}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    )
}