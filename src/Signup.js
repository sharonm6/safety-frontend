import React from "react";

const SignUp = () => {
  return (
    <div className="sign-up-form">
      <h2>Sign up</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="other" name="gender" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" placeholder="Age" />
        </div>

        <div className="form-group">
          <label htmlFor="ethnicity">Ethnicity</label>
          <select id="ethnicity" name="ethnicity">
            <option value="">Choose option</option>
            {/* Add options as needed */}
          </select>
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
