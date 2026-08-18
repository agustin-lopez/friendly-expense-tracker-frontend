import {Link} from "react-router-dom";

export default function ProfileSettings() {

    return (
        <div>
            <div className="flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-bold text-gray-700">About this app</h3>
                    <div className="custom-underline"></div>
                </div>

                <p>
                    Friendly Expense Tracker was designed as a small app to keep track of your personal finances in a
                    very simple and visual way, featuring a retro-inspired aesthetic crafted from scratch. <br/>
                    This is my first polished, deployed and fully functional project made using Java, Spring Boot, PostgreSQL, and React :)
                </p>


                <div className="h-[2px] w-full bg-gray-300"/>
            </div>

            <div className="flex flex-col gap-5 m-6 text-sm max-xs:text-[12px]">
                <div>
                    <h3 className="text-base font-bold text-gray-700">About me</h3>
                    <div className="custom-underline"></div>
                </div>

                <p>
                    Hi! I'm Agustín López, a full-stack development student based Argentina. I love building
                    user-friendly web apps that combine clean backend logic with memorable visual design. <br/>
                    Feel free to explore my repositories on {" "}
                    <Link to="https://github.com/agustin-lopez" className="text-blue-600 hover:underline">
                        GitHub
                    </Link>
                    !
                </p>
            </div>
        </div>
    );
}