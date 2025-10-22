import React from 'react'

const UpdateCampaign = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-[#0A1A2F]">
      <div className="bg-[#152D45] w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-[#2ECC71] text-center">
          Create Campaign
        </h2>

        <form className="flex flex-col gap-4 overflow-auto">
          {/* Summary */}
          <div className="flex flex-col">
            <label className="text-[#BDC3C7] mb-2 font-medium">Summary</label>
            <textarea
              className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              rows="3"
              placeholder="Enter campaign summary..."
            ></textarea>
          </div>

          {/* Budget */}
          <div className="flex flex-col">
            <label className="text-[#BDC3C7] mb-2 font-medium">Budget (Rs.)</label>
            <input
              type="number"
              className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              placeholder="Enter budget"
            />
          </div>

          {/* Target Audience */}
          <div className="flex flex-col">
            <label className="text-[#BDC3C7] mb-2 font-medium">Target Audience</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              placeholder="e.g., Cildren, Elders"
            />
          </div>

          {/* Venue */}
          <div className="flex flex-col">
            <label className="text-[#BDC3C7] mb-2 font-medium">Venue</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              placeholder="Enter venue"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[#BDC3C7] mb-2 font-medium">Date</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#BDC3C7] mb-2 font-medium">Time</label>
              <input
                type="time"
                className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#2ECC71] text-[#0A1A2F] font-bold rounded-lg hover:bg-[#27AE60] transition-colors"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCampaign
