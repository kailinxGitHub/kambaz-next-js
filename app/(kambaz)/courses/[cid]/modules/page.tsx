export default function Modules() {
  return (
    <div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">HTML FORMS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Creating forms</li>
                <li className="wd-content-item">Form validation</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">CSS BASICS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Styling elements</li>
                <li className="wd-content-item">CSS selectors</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
