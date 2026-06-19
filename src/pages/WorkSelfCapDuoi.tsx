import WaShell from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import CollapsibleSection from '../components/CollapsibleSection'
import SanTapPortal from '../components/SanTapPortal'
import UnderstandSubordinateSection from '../components/UnderstandSubordinateSection'

export default function WorkSelfCapDuoi() {
  return (
    <WaShell>
      <WaTopBar backLabel="Về mình" backRoute="/work/self" />

      <div style={{ padding: '8px 20px 40px' }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 20px',
          }}
        >
          Hiểu cấp dưới
        </h1>

        <CollapsibleSection
          icon="👥"
          iconImg="/assets/icons/self-subordinate.png"
          title="Góc 1-1 với cấp dưới"
        >
          <UnderstandSubordinateSection embedded />
        </CollapsibleSection>

        <div style={{ paddingTop: 24 }}>
          <SanTapPortal
            label="Thử tình huống với cấp dưới"
            sublabel="Luyện phản xạ quản lý thực tế"
            context={{ module: 'WA', role: 'NV', scenario: 'feedback' }}
            accent="#A8E63D"
          />
        </div>
      </div>
    </WaShell>
  )
}
