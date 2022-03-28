import InputMask from "react-input-mask"

function MaskedInputCPF({ onChange, value }) {

    return (
        <InputMask
            mask="999.999.999.99"
            value={value}
            onChange={onChange}
            name="buyer-tax-number"
            id="buyer-tax-number"
            type="text"
            inputMode="numeric"
            className="movie-seats__buyer-name"
            placeholder="Digite o CPF..."
            required />
    )
}

export default MaskedInputCPF