using HonkaiCalc.Services;
using Microsoft.AspNetCore.Mvc;

namespace HonkaiCalc
{
    [Produces("application/json")]
    [Route("calc")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculator;

        public CalculatorController(CalculatorService calculator)
        {
            _calculator = calculator;
        }

        [HttpPost]
        public IActionResult Calculate([FromBody] CalculatorParams calculatorParams)
        {
            try
            {
                return Ok(_calculator.Calculate(calculatorParams));
            }
            catch (Exception)
            {
                return StatusCode(422);
            }
        }
    }
}
