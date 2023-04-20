import React from "react";

const Interaction = ({
  type = "primary",
  children,
  onClick = () => {},
  className = "",
}) => {
  let styled = `transition-all interactButton postButton cursor-pointer  text-[13px]  font-semibold`;
  let newStyled = ``;
  switch (type) {
    case "primary":
      newStyled = `text-blue-600 hover:text-blue-900`;
      break;
    case "secondary":
      newStyled = `text-slate-700 hover:text-slate-400`;
      break;
    case "follow":
      newStyled = `px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-all`;
      break;
    case "following":
      newStyled = `px-3 py-2 rounded-lg bg-[#EFEFEF]  text-slate-800 hover:bg-[#DBDBDB] transition-all`;
      break;
    default:
      newStyled = "";
      break;
  }
  return (
    <span onClick={onClick} className={`${styled} ${newStyled} ${className}`}>
      {children}
    </span>
  );
};

export default Interaction;
