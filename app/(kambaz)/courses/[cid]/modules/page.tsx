"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useEffect, useState } from "react";
import {
  createModuleAsync,
  deleteModuleAsync,
  editModule,
  fetchModulesForCourse,
  saveModuleAsync,
  updateModule,
} from "./reducer";
import type { Module, ModuleLesson } from "@/lib/kambaz/client-api";
import { useAppDispatch, useAppSelector } from "../../../hooks";

export default function Modules() {
  const { cid } = useParams() as { cid: string };
  const { modules, status } = useAppSelector((state) => state.modulesReducer);
  const dispatch = useAppDispatch();
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    if (cid) {
      void dispatch(fetchModulesForCourse(cid));
    }
  }, [cid, dispatch]);

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={async () => {
          await dispatch(createModuleAsync({ courseId: cid, module: { name: moduleName } }));
          setModuleName("");
        }}
      />
      <br />
      <br />
      <br />
      {status === "loading" && <div className="mb-3">Loading modules...</div>}
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        await dispatch(saveModuleAsync({ ...module, editing: false }));
                      }
                    }}
                    onBlur={async () => {
                      await dispatch(saveModuleAsync({ ...module, editing: false }));
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModuleAsync(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: ModuleLesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />{" "}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
