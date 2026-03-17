"use client";
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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, updateCourse, deleteCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import * as db from "../database";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [enrolling, setEnrolling] = useState(false);
  const isFaculty = currentUser?.role === "FACULTY";
  const shouldShowAllCourses = isFaculty || enrolling || !currentUser;
  const visibleCourses = shouldShowAllCourses
    ? courses
    : courses.filter((course: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === course._id
        )
      );
  const [course, setCourse] = useState<any>({
    name: "New Course",
    description: "New Description",
    number: "New Number",
    startDate: "2026-01-01",
    endDate: "2026-05-15",
    image: "/images/reactjs.jpg",
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {!isFaculty && currentUser && (
          <Button
            variant="primary"
            className="float-end"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "My Courses" : "Enrollments"}
          </Button>
        )}
      </h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
        <Button
          variant="primary"
          className="float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addCourse(course))}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </Button>
      </h5>
      <br />
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={4}
          className="g-4"
          style={{ marginRight: 0, marginLeft: 0 }}
        >
          {visibleCourses.map((course: any) => {
              const isEnrolled = enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser?._id &&
                  enrollment.course === course._id
              );
              return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image || "/images/reactjs.jpg"}
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    {isFaculty && (
                      <>
                        <Button
                          variant="danger"
                          className="float-end"
                          id="wd-delete-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          className="float-end me-2"
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                    {!isFaculty && currentUser && <Button
                        variant={isEnrolled ? "danger" : "success"}
                        className="float-end"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isEnrolled) {
                            dispatch(unenroll({ course: course._id, user: currentUser._id }));
                          } else {
                            dispatch(enroll({ course: course._id, user: currentUser._id }));
                          }
                        }}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    }
                  </CardBody>
                </Link>
              </Card>
            </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
