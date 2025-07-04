using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Wallee.Mcp.CorporateInfos.Dtos
{
    public class UpdateItemsDto : IValidatableObject
    {
        public string CreditCode { get; set; } = default!;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (CreditCode.Length != 18)
            {
                yield return new ValidationResult("社会信用代码证号不正确");
            }
        }
    }
}
