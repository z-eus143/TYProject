import { Header } from "../header/header"
import "../update/style.css"

export const UpdatePropertyDetails = () => {
    const handleSubmit = () => {}
    return(
        <>
        <Header/>
        <h1 className="top_space"></h1>
            <div className="container_update">
              <header className="header">
                <h1 className="logo">Update Property Details</h1>
              </header>
              <main className="main-content">
                <div className="form-container-update">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="property-name">Property Name</label>
                      <input type="text" id="property-name" name="property-name" placeholder="Enter property name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="property-address">Property Address</label>
                      <input type="text" id="property-address" name="property-address" placeholder="Enter property address" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="property-description">Property Description</label>
                      <textarea id="property-description" name="property-description" placeholder="Enter property description" required></textarea>
                    </div>
                    <button type="submit" className="btn-update">Update Details</button>
                  </form>
                </div>
              </main>
            </div>
            </>
    )
}
  