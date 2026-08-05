export default function DefaultButton({children,
                                       fontSize = 12,
                                       className = "",
                                       onClickAction,
                                       submit = false}) {
    return (
        <div className={`white-button-wrap ${className}`}>
            <button
                type={submit ? "submit" : "button"}
                onClick={onClickAction}
                className="white-button"
                style={{ fontSize: `${fontSize}px`}}
            >
                {children}
            </button>
        </div>
    )
}