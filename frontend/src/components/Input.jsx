const Input = ({ ...inputData }) => {
    let baseCSS = ``;
    const cssMargins = `px-2 py-1 rounded-md`;
    const transitionCSS = `transition-all`;

    if (inputData.type === 'button' || inputData.type === 'submit') {
        const buttonCSS = `cursor-pointer text-slate-100 bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-40% to-emerald-600 to-100%`;
        baseCSS = [buttonCSS, cssMargins, transitionCSS].join(' ');
    } else if (inputData.type === 'text') {
        const textCSS = `rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm/6`;
        baseCSS = [cssMargins, transitionCSS, textCSS].join(' ');
    }
    inputData = {
        ...inputData,
        className: [inputData.className, baseCSS].join(' '),
    };
    return (
        <>
            <input {...inputData} />
        </>
    );
};

export default Input;
