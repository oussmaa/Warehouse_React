import React, { useState } from "react";

function Main() {
  return (
    <>
      <div className="px-5 sm:px-20 mt-10 pt-0 border-slate-200/60 dark:border-darkmode-400">
        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-1" className="form-label">
              Sub
            </label>
            <input
              id="input-wizard-1"
              type="text"
              className="form-control"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-2" className="form-label">
              To
            </label>
            <input
              id="input-wizard-2"
              type="text"
              className="form-control"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-3" className="form-label">
              Subject
            </label>
            <input
              id="input-wizard-3"
              type="text"
              className="form-control"
              placeholder="Important Meeting"
            />
          </div>
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-4" className="form-label">
              Has the Words
            </label>
            <input
              id="input-wizard-4"
              type="text"
              className="form-control"
              placeholder="Job, Work, Documentation"
            />
          </div>
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-5" className="form-label">
              Doesn't Have
            </label>
            <input
              id="input-wizard-5"
              type="text"
              className="form-control"
              placeholder="Job, Work, Documentation"
            />
          </div>
          <div className="intro-y col-span-12 sm:col-span-6">
            <label htmlFor="input-wizard-6" className="form-label">
              Size
            </label>
            <select id="input-wizard-6" className="form-select">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
