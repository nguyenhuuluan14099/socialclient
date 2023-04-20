import useDarkMode from "components/hooks/useDarkMode";
import { toggleDarkMode } from "components/redux/globalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function ToggleDarkMode() {
  const [darkMode, setDarkMode] = useDarkMode();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode(!darkMode));
    setDarkMode(!darkMode);
  };
  return (
    <button
      onClick={handleToggleDarkMode}
      // className="p-3 text-white bg-blue-600 rounded-lg"
    >
      {/* ToggleDarkMode */}
    </button>
  );
}
