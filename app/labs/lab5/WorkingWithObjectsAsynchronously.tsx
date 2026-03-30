"use client";

import { useEffect, useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
import {
  Assignment,
  ModuleData,
  fetchAssignment,
  fetchModule,
  getErrorMessage,
  updateAssignmentCompleted,
  updateAssignmentScore,
  updateModuleDescription,
  updateModuleName,
  updateTitle,
} from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("0");
  const [completed, setCompleted] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = async () => {
    try {
      const [assignmentData, moduleResponse] = await Promise.all([
        fetchAssignment(),
        fetchModule(),
      ]);
      setAssignment(assignmentData);
      setModuleData(moduleResponse);
      setTitle(assignmentData.title);
      setScore(`${assignmentData.score}`);
      setCompleted(assignmentData.completed);
      setModuleName(moduleResponse.name);
      setModuleDescription(moduleResponse.description);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const applyTitle = async () => {
    try {
      setAssignment(await updateTitle(title));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const applyScore = async () => {
    try {
      setAssignment(await updateAssignmentScore(Number(score)));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const applyCompleted = async (isCompleted: boolean) => {
    try {
      setCompleted(isCompleted);
      setAssignment(await updateAssignmentCompleted(isCompleted));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const applyModuleName = async () => {
    try {
      setModuleData(await updateModuleName(moduleName));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const applyModuleDescription = async () => {
    try {
      setModuleData(await updateModuleDescription(moduleDescription));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <div id="wd-lab5-objects-async" className="mb-4">
      <h3>Working With Objects Asynchronously</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <button className="btn btn-secondary mb-3" onClick={() => void loadData()}>
        Reload Objects
      </button>

      <pre className="bg-light p-2 border">{JSON.stringify(assignment, null, 2)}</pre>
      <FormControl
        className="mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment title"
      />
      <button className="btn btn-primary mb-2" onClick={() => void applyTitle()}>
        Update Title
      </button>

      <FormControl
        className="mb-2"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Assignment score"
      />
      <button className="btn btn-warning mb-2" onClick={() => void applyScore()}>
        Update Score
      </button>

      <FormCheck
        className="mb-3"
        checked={completed}
        onChange={(e) => void applyCompleted(e.target.checked)}
        label="Assignment Completed"
      />

      <pre className="bg-light p-2 border">{JSON.stringify(moduleData, null, 2)}</pre>
      <FormControl
        className="mb-2"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="Module name"
      />
      <button className="btn btn-primary mb-2" onClick={() => void applyModuleName()}>
        Update Module Name
      </button>

      <FormControl
        className="mb-2"
        value={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)}
        placeholder="Module description"
      />
      <button
        className="btn btn-warning"
        onClick={() => void applyModuleDescription()}
      >
        Update Module Description
      </button>
      <hr />
    </div>
  );
}
