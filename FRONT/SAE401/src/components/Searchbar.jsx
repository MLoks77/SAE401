const SearchbarModal = () => {
    return (
        <div className="flex items-center gap-2 p-2 border border-[#384451] bg-[#131C30]">
            <svg width="16px" height="16px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#D2D2D2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#D2D2D2"></path></g></svg>
            <input className="text-white w-100 bg-transparent outline-none border-none placeholder:text-[#D2D2D2]/50" type="text" placeholder="Rechercher un numéro de département..."></input>
        </div>
    );
};

export default SearchbarModal;