import React from "react";

const TodoEmptyState = () => {
  return (
    <div className="emptyTodoList">
      <img
        src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg?w=740&t=st=1724776178~exp=1724776778~hmac=95d266aa99f7f5b703f43501eb7d88e9434e59e79c71b302a9ec15a4041d49cb"
        alt="emptyTodoList"
      />
      <p className="font-xl text-slate-600">
        Your to-do list is clear and ready for new tasks. Let’s get started on
        something great!
      </p>
    </div>
  );
};

export default TodoEmptyState;
