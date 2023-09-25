import Table from "../../components/Table";
import React from "react";
import Slide_bar from "../../components/Slider_bar";

function Devices_page() {
    return (
        <div className="Devices_page" >


            <Slide_bar>
                <div style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12 }}>

                    <Table></Table>
                </div>
            </Slide_bar>

        </div>
    );
}
export default Devices_page;