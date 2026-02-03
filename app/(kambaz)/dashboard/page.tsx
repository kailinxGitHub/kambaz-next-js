import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

const COURSES = [
  {
    id: "1234",
    title: "CS1234 React JS",
    description: "Full Stack software developer",
    image: "/images/reactjs.jpg",
  },
  {
    id: "1234",
    title: "CS5678 Node.js",
    description: "Backend Development",
    image: "/images/teslabot.jpg",
  },
  {
    id: "1234",
    title: "CS9012 MongoDB",
    description: "Database Management",
    image: "/images/angel-falls.jpg",
  },
  {
    id: "1234",
    title: "CS3456 Python",
    description: "Python Programming",
    image: "/images/stacked.jpg",
  },
  {
    id: "1234",
    title: "CS7890 Java",
    description: "Object-Oriented Programming",
    image: "/images/reactjs.jpg",
  },
  {
    id: "1234",
    title: "CS2468 Algorithms",
    description: "Data Structures and Algorithms",
    image: "/images/teslabot.jpg",
  },
  {
    id: "1234",
    title: "CS1357 Web Development",
    description: "Modern Web Technologies",
    image: "/images/angel-falls.jpg",
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={4}
          className="g-4"
          style={{ marginRight: 0, marginLeft: 0 }}
        >
          {COURSES.map((course, index) => (
            <Col
              key={index}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${course.id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
