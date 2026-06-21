import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle} from "react-icons/fi";
import '../index.css';

function Navigation() {
    const iconSize = 24;
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/">
                        <FiHome size={iconSize} />
                    </Link>
                </li>
                <li>
                    <Link to="/add">
                        <FiPlusCircle size={iconSize} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export { Navigation };