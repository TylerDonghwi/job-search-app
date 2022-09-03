type jobProps = {
    id: string,
    creationDate: string,
    client: string
    contact: string
}

export default function Job({ id, creationDate, client, contact }: jobProps) {
    return (
        <div>{id} {creationDate} {client} {contact} </div>
    )
}
