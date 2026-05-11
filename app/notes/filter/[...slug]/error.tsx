'use client';



interface ErrorProps {
    error: Error
};

const Error = ({error}: ErrorProps) => {
    console.log(error)
    return (
        <p>Could not fetch the list of notes. {error.message}</p>
    )
};

export default Error;