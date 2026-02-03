import Link from "next/link";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
} from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid } = await params;

  return (
    <div id="wd-assignments-editor" className="mb-4">
      <nav className="mb-3" aria-label="breadcrumb">
        <ol className="breadcrumb mb-1">
          <li className="breadcrumb-item">
            <Link
              href={`/courses/${cid}`}
              className="text-danger text-decoration-none"
            >
              CS5610 SU1 24 MO...
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              href={`/courses/${cid}/assignments`}
              className="text-danger text-decoration-none"
            >
              Assignments
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            A1
          </li>
        </ol>
      </nav>

      <Form>
        <p className="text-secondary small mb-1">202440_2 Summer 1 2024 S.</p>

        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl id="wd-name" type="text" defaultValue="A1" />
        </div>

        <div className="mb-3">
          <FormLabel>Description</FormLabel>
          <FormControl
            id="wd-description"
            as="textarea"
            rows={10}
            className="border"
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
          <FormControl
            id="wd-points"
            type="number"
            defaultValue={100}
            style={{ maxWidth: "120px" }}
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
          <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
          <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Letter">Letter</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          <FormSelect id="wd-submission-type" defaultValue="Online">
            <option value="Online">Online</option>
            <option value="On Paper">On Paper</option>
            <option value="External Tool">External Tool</option>
            <option value="No Submission">No Submission</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel className="d-block mb-2">Online Entry Options</FormLabel>
          <FormCheck
            type="checkbox"
            id="wd-submission-text-entry"
            label="Text Entry"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-website-url"
            label="Website URL"
            defaultChecked
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-media-recordings"
            label="Media Recordings"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-student-annotation"
            label="Student Annotation"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-file-uploads"
            label="File Uploads"
            className="mb-1"
          />
        </div>

        <FormLabel className="d-block mb-2">Assign</FormLabel>
        <div className="mb-3">
          <FormLabel
            htmlFor="wd-assign-to"
            className="text-secondary fw-normal small"
          >
            Assign to
          </FormLabel>
          <FormControl id="wd-assign-to" type="text" defaultValue="Everyone" />
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-due-date"
              className="text-secondary fw-normal small"
            >
              Due
            </FormLabel>
            <div className="input-group">
              <FormControl
                id="wd-due-date"
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-available-from"
              className="text-secondary fw-normal small"
            >
              Available from
            </FormLabel>
            <div className="input-group">
              <FormControl
                id="wd-available-from"
                type="datetime-local"
                defaultValue="2024-05-06T00:00"
              />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-until"
              className="text-secondary fw-normal small"
            >
              Until
            </FormLabel>
            <div className="input-group">
              <FormControl id="wd-until" type="datetime-local" />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button
            variant="light"
            className="border text-secondary"
            type="button"
          >
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
