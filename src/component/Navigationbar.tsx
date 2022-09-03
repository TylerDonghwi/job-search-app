
export default function Navbar() {

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className="sticky bg-white shadow-lg flex flex-row items-center h-[4.5rem]">
            <hr className='absolute left-0 top-0 bg-orange-500 w-[100%] h-[3px] border-none'></hr>
            <h1 className='text-xl p-4 font-bold' onClick={refreshPage}>Job Search</h1>
        </div>
    )
}