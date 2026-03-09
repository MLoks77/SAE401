import Navbar from "../components/navbar";
import BtnCriteres from "../components/Comparer/btnCriteres";

import Graphv1 from "../components/Comparer/graphv1";
import Graphv2 from "../components/Comparer/graphv2";

const GridCompar = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111822]">
            <Navbar></Navbar>
            <BtnCriteres></BtnCriteres>
            <div className="flex-1 flex flex-row p-4 pb-8 gap-4">
                <Graphv1 />
                <Graphv2 />
            </div>
        </div>
    );
};

export default GridCompar;