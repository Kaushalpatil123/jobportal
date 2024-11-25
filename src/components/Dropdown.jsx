import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const Dropdown = ({ title, items }) => {
    const isOpen = true;
    let [height, setHeight] = useState(props.type == "sideBar" ? false : true);

    const handlerHeight = () => {
      setHeight(!height);
    };

    return (
      <li
        className={`${props.type == "sideBar" ? null : "nav-item-home"
          } nav-item  z-10`}
      >
        <div
          className={`${props.type == "sideBar" ? "nav-link-sidebar" : "nav-link"
            } cursor-pointer`}
          onClick={props.type == "sideBar" ? handlerHeight : null}
        >
          <div className={`${props.type == "sideBar" && "title"}`}>{title}</div>
          <div
            className={`${props.type == "sideBar" && "icon"}`}
            style={{
              transform:
                props.type == "sideBar" && height
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#000000" }}
            />
          </div>
        </div>
        {isOpen && (
          <div
            className={`${props.type == "sideBar"
                ? "sidebar-alignment sidebar-dropdown-content"
                : "home-alignment home-dropdown-content"
              } min-[900px]:max-[1372px]:mt-4`}
            style={{
              height: height ? "auto" : "0px",
              visibility: height ? "visible" : "hidden",
            }}
          >
            {items.map((item, index) => (
              <Link key={index} to={item.link}>
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <Dropdown
        title="Resume Writing"
        items={[
          { title: "Text Resume", link: "Text-Resume-Entry-Level" },
          { title: "Visual Resume", link: "Visual-Resume-Entry-Level" },
          { title: "Resume Critique", link: "Resume-Critique" },
          { title: "Resume Quality Score", link: "Resume-Quality-Score" },
          { title: "Cover Letter", link: "Cover-Letter" },
        ]}
      />
      <Dropdown
        title="International Services"
        items={[
          {
            title: "International Resume",
            link: "International-Resume-Entry-Level",
          },
          {
            title: "Visual International Resume",
            link: "Visual-Resume-International-Entry-Level",
          },
          {
            title: "Zap Your Resume-International",
            link: "Zap-Your-Resume-International",
          },
        ]}
      />
      <Dropdown
        title="Career Growth"
        items={[
          { title: "Zap Your Resume", link: "Zap-Your-Resume" },
          { title: "Highlight Your Resume", link: "Highlight-Your-Resume" },
          { title: "Job Search Assistant", link: "Job-Search-Assistant" },
          { title: "Interview Preparation", link: "Interview-Preparation" },
          {
            title: "Job Alert On Mail and SMS",
            link: "Job-Alert-On-Mail-And-SMS",
          },
          // {title:'Top Management Profile', link:'Top-Management-Profile'},
          // {title:'Profile Update', link:'Profile-Update'},
          { title: "Social Profiler", link: "Social-Profiler" },
          // { title: "Personal Portfolio", link: "Personal-Portfolio" },
        ]}
      />
      <Dropdown
        title="Screening Services"
        items={[
          {
            title: "Employee Background Verification",
            link: "Employee-Background-Verification",
          },
          { title: "Document Verification", link: "Document-Verification" },
          // { title: "Web Screening Services", link: "Web-Screening-Services" },
        ]}
      />
      <Dropdown
        title="Value Packs"
        items={[
          { title: "Combo Resume Pack", link: "Combo-Resume-Pack" },
          { title: "Combos Highlights", link: "Combos-Highlights" },
          {title:"Combo Job Boost", link: "Combo-Job-Boost"},
          {title:"Combo International Packs",link:"Combo-International-Packs"},
          // {title:"Footer2",link:"Footer2"},
          // {title:"Check Out",link:"Check-Out"},
          
          
          
          
        ]}
      />
    </>
  );
};

export default Dropdown;
