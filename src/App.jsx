import { useState } from 'react';

const API_URL = 'http://localhost:8080/api/bmi';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setResult(null);
    setError('');

    const heightCm = Number(height);
    const weightKg = Number(weight);

    if (!height || !weight || !Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
      setError('Please enter both height and weight.');
      return;
    }
    if (heightCm < 50 || heightCm > 250 || weightKg < 10 || weightKg > 500) {
      setError('Please check your entries. Height should be 50–250 cm and weight 10–500 kg.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heightCm, weightKg })
      });

      if (!response.ok) {
        throw new Error('The server could not calculate BMI. Check the inputs and try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not connect to the backend. Make sure Spring Boot is running.');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  }

  return (
    <main className="page">
      <nav className="topbar">
        <div className="brand-mark">+</div>
        <span>Wellness <b>Check</b></span>
        <span className="top-note">BMI CALCULATOR</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL WELLNESS TOOL</div>
        <h1>Understand your<br /><span>BMI.</span></h1>
        <p className="intro">
          Enter your height and weight to calculate your Body Mass Index.
          Your details are used for this calculation only and are not saved.
        </p>

        <div className="calculator">
          <div className="form-panel">
            <div className="panel-heading">
              <div>
                <h2>Enter your details</h2>
                <p>Use centimetres and kilograms.</p>
              </div>
              <div className="person-icon" aria-hidden="true">↕</div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="height">Height <span>(cm)</span></label>
              <div className="input-wrap">
                <input id="height" type="number" min="50" max="250" step="0.1"
                  placeholder="e.g. 165" value={height}
                  onChange={(e) => setHeight(e.target.value)} required />
                <span className="unit">CM</span>
              </div>

              <label htmlFor="weight">Weight <span>(kg)</span></label>
              <div className="input-wrap">
                <input id="weight" type="number" min="10" max="500" step="0.1"
                  placeholder="e.g. 60" value={weight}
                  onChange={(e) => setWeight(e.target.value)} required />
                <span className="unit">KG</span>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Calculating…' : 'Calculate BMI'} <span aria-hidden="true">→</span>
              </button>
              <button className="reset-button" type="button" onClick={resetForm}>Clear details</button>
            </form>

            {error && <div className="error" role="alert">{error}</div>}
          </div>

          <div className="result-panel" aria-live="polite">
            <div className="result-label">YOUR RESULT</div>
            {result ? (
              <>
                <div className="result-number">{result.bmi.toFixed(2)}</div>
                <div className="result-title">BMI value</div>
                <div className="category-pill">{result.category}</div>
                <p className="result-description">
                  This is a general adult reference category, not a diagnosis.
                  BMI alone does not describe a person's overall health.
                </p>
                <div className="mini-scale" aria-label="Adult BMI reference ranges">
                  <span></span><span></span><span></span><span></span>
                </div>
                <p className="scale-caption">Adult reference ranges vary by context.</p>
              </>
            ) : (
              <div className="empty-result">
                <div className="circle-art"><span>↗</span></div>
                <h3>Your result will appear here</h3>
                <p>Enter the details on the left and select Calculate BMI.</p>
              </div>
            )}
          </div>
        </div>

        <p className="disclaimer">
          <b>Important:</b> BMI is a screening measure, not a diagnosis. Adult BMI categories
          should not be used for children or teenagers; their results require age- and sex-specific interpretation.
        </p>
      </section>
      <footer>BUILT WITH <b>REACT</b> + <b>SPRING BOOT</b></footer>
    </main>
  );
}
